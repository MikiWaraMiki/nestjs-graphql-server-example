import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field((_type) => [Post], { defaultValue: [] })
  posts: Post[];
}
