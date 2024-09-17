import { Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { existsSync, mkdirSync } from 'fs';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('fullName') fullName: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
    @Context() ctx: { req: Request },
  ) {
    const imgUrl = file ? await this.storeImageAndGetUrl(file) : null;
    const userId = ctx.req.user.sub;
    return this.userService.updateProfile(userId, fullName, imgUrl);
  }

  private async storeImageAndGetUrl(file: GraphQLUpload.FileUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const uploadDir = join(process.cwd(), `${process.env.UPLOAD_DIR}`);

    // Ensure the upload directory exists
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    const imgPath = join(uploadDir, uniqueFilename);
    const imgUrl = `${process.env.APP_URL}/${uniqueFilename}`;
    const readStream = createReadStream();

    readStream.pipe(createWriteStream(imgPath));

    return imgUrl;
  }
}
