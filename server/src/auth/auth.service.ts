import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    let payload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException(
        'Invalid or expired refresh token::\n',
        e,
      );
    }
    const usersExits = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!usersExits) {
      throw new UnauthorizedException('User not found');
    }
    const expireIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expireIn;
    const accessToken = this.jwtService.sign(
      {
        ...payload,
        exp: expiration,
      },
      { secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET') },
    );
    res.cookie('access-token', accessToken, {
      maxAge: expireIn * 1000,
      httpOnly: process.env.NODE_ENV === 'production',
    });
  }
  private async issueTokens(user: User, res: Response) {
    const payload = { username: user.fullname, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });
    res.cookie('refresh-token', refreshToken, {
      httpOnly: process.env.NODE_ENV === 'production',
    });
    res.cookie('access-token', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
    });
    return user;
  }
  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.validate(
      user.password,
      loginDto.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  async register(registerDto: RegisterDto, res: Response) {
    const isExist = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });
    if (isExist) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 8);
    const user = await this.prisma.user.create({
      data: {
        fullname: registerDto.fullname,
        email: registerDto.email,
        password: hashedPassword,
      },
    });
    return this.issueTokens(user, res);
  }
  async login(loginDto: LoginDto, res: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueTokens(user, res);
  }
  async logOut(res: Response) {
    res.clearCookie('refresh-token');
    res.clearCookie('access-token');
    return 'Logout successfully';
  }
}
