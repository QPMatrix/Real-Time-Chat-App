import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async updateProfile(userId: string, fullname: string, avatarUrl: string) {
    if (avatarUrl) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          fullname,
          avatarUrl,
        },
      });
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: { fullname },
    });
  }
}
