import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';

@Injectable()
export class ChatroomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getChatRoom(id: string) {
    return this.prisma.chatroom.findUnique({
      where: {
        id: id,
      },
    });
  }
  async createChatRoom(name: string, sub: string) {
    const existingChatRoom = await this.prisma.chatroom.findFirst({
      where: {
        name,
      },
    });
    if (existingChatRoom) {
      throw new BadRequestException('Chatroom with this name already exists');
    }
    return this.prisma.chatroom.create({
      data: {
        name,
        users: {
          connect: {
            id: sub,
          },
        },
      },
    });
  }
  async addUserToChatRoom(chatRoomId: string, userIds: string[]) {
    const existingChatRoom = await this.prisma.chatroom.findUnique({
      where: {
        id: chatRoomId,
      },
    });
    if (!existingChatRoom) {
      throw new BadRequestException('Chatroom does not exist');
    }
    return this.prisma.chatroom.update({
      where: {
        id: chatRoomId,
      },
      data: {
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
      include: {
        users: true,
      },
    });
  }
  async getChatRoomsForUser(userId: string) {
    return this.prisma.chatroom.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
  async sendMessage(
    chatRoomId: string,
    message: string,
    userId: string,
    imagePath: string,
  ) {
    return this.prisma.message.create({
      data: {
        content: message,
        imageUrl: imagePath,
        chatroomId: chatRoomId,
        userId,
      },
      include: {
        chatroom: {
          include: {
            users: true,
          },
        },
        user: true,
      },
    });
  }
  async saveImage(image: {
    createReadStream: () => any;
    fileName: string;
    mimetype: string;
  }) {
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
    ];
    if (!validImageTypes.includes(image.mimetype)) {
      throw new BadRequestException('Invalid image type');
    }
    const imageName = `${Date.now()}-${image.fileName}`;
    const imagePath = `${this.configService.get('UPLOADS_DIR')}/${imageName}`;
    const stream = image.createReadStream();
    const writeStream = fs.createWriteStream(imagePath);
    stream.pipe(writeStream);
    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    return imagePath;
  }

  async getMessages(chatRoomId: string) {
    return this.prisma.message.findMany({
      where: {
        chatroomId: chatRoomId,
      },
      include: {
        chatroom: {
          include: {
            users: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
        user: true,
      },
    });
  }
  async deleteChatRoom(chatRoomId: string) {
    return this.prisma.chatroom.delete({
      where: {
        id: chatRoomId,
      },
    });
  }
}
