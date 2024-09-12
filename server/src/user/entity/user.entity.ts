import { Field, HideField, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id?: string;
  @Field()
  fullName: string;
  @Field()
  email?: string;
  @Field({ nullable: true })
  avatarUrl?: string;
  @HideField()
  password?: string;
  @Field({ nullable: true })
  createdAt?: Date;
  @Field({ nullable: true })
  updatedAt?: Date;
}
