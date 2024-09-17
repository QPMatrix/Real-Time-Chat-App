import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { join } from 'path';
import * as fs from 'node:fs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: string, fullName: string, avatarUrl: string) {
    // Retrieve old user information before updating
    const oldUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        avatarUrl,
      },
    });

    // If there's an old avatar, try to delete it
    if (oldUser.avatarUrl) {
      const imageName = oldUser.avatarUrl.split('/').pop();
      console.log('Image name:', imageName); // Log image name

      const imagePath = join(__dirname, '..', '..', 'uploads', imageName);
      console.log('Image path:', imagePath); // Log image path

      // Check if file exists and then delete
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
          console.log(`Deleted file: ${imagePath}`);
        } catch (error) {
          console.error(`Error deleting file: ${imagePath}`, error);
        }
      } else {
        console.log(`File not found: ${imagePath}`);
      }
    }

    return updatedUser;
  }
  async searchUsers(fullName: string, userId: string) {
    return this.prisma.user.findMany({
      where: {
        fullName: {
          contains: fullName,
        },
        id: {
          not: userId,
        },
      },
    });
  }
  async getUsersOfChatroom(chatRoomId: string) {
    return this.prisma.user.findMany({
      where: {
        chatrooms: {
          some: {
            id: chatRoomId,
          },
        },
      },
    });
  }
}
