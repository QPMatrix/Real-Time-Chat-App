import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  extractToken(connection: any) {
    return connection?.token || null;
  }
  validateToken(token: string) {
    const refreshToken = this.configService.getOrThrow<string>(
      'REFRESH_TOKEN_SECRET',
    );
    try {
      return verify(token, refreshToken);
    } catch (e) {
      return null;
    }
  }
}
