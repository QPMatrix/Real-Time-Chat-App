import { Resolver, Mutation, Context, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './types';
import { LoginDto, RegisterDto } from './dto';
import { Request, Response } from 'express';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() ctx: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const { user } = await this.authService.register(registerDto, ctx.res);
    return { user };
  }
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() ctx: { res: Response },
  ) {
    return this.authService.login(loginDto, ctx.res);
  }
  @Mutation(() => String)
  async logout(@Context() ctx: { res: Response }) {
    return this.authService.logOut(ctx.res);
  }
  @Mutation(() => String)
  async refreshToken(@Context() ctx: { res: Response; req: Request }) {
    try {
      return this.authService.refreshToken(ctx.req, ctx.res);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Query(() => String)
  async hello() {
    return 'Hello';
  }
}
