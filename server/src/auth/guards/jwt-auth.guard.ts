import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = context.getArgByIndex(2);
    const req: Request = gqlContext.req;
    const token = req.cookies['access-token'];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      req['user'] = this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid token::\n', e);
    }
    return true;
  }
}
