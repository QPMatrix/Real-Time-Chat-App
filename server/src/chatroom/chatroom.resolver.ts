import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatroomService } from './chatroom.service';
import { UserService } from '../user/user.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQLErrorFilter } from '../filters/custom-exception';
import { GraphqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Chatroom, Message } from './entity';
import { Request } from 'express';

@Resolver()
@UseFilters(GraphQLErrorFilter)
@UseGuards(GraphqlAuthGuard)
export class ChatroomResolver {
  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Chatroom)
  async createChatRoom(
    @Args('name') name: string,
    @Context() ctx: { req: Request },
  ) {
    return this.chatroomService.createChatRoom(name, ctx.req.user.sub);
  }
  @Mutation(() => Chatroom)
  async addUserToChatRoom(
    @Args('chatRoomId') chatRoomId: string,
    @Args('usersIds', { type: () => [String] }) userIds: string[],
  ) {
    return this.chatroomService.addUserToChatRoom(chatRoomId, userIds);
  }

  @Query(() => [Chatroom])
  async getChatRoomForUser(@Args('userId') userId: string) {
    return this.chatroomService.getChatRoomsForUser(userId);
  }
  @Query(() => [Message])
  async getMessagesForChatRoom(@Args('chatRoomId') chatRoomId: string) {
    return this.chatroomService.getMessages(chatRoomId);
  }
  @Mutation(() => String)
  async deleteChatRoom(
    @Args('chatRoomId') chatRoomId: string,
  ): Promise<string> {
    await this.chatroomService.deleteChatRoom(chatRoomId);
    return 'Chatroom deleted';
  }
}
