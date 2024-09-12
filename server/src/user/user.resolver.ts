import { Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('fullname') fullname: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
    @Context() ctx: { req: Request },
  ) {
    const imgUrl = file ? await this.storeImageAndGetUrl(file) : null;
    const userId = ctx.req.user.sub;
    return this.userService.updateProfile(userId, fullname, imgUrl);
  }
  private async storeImageAndGetUrl(file: GraphQLUpload.FileUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imgPath = join(
      process.cwd(),
      `${process.env.UPLOAD_DIR}/${uniqueFilename}`,
    );
    const imgUrl = `${process.env.APP_URL}/${uniqueFilename}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imgPath));
    return imgUrl;
  }
}
