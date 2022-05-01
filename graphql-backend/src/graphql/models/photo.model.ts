import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Photo {
  @Field(() => ID)
  id: string;

  @Field(() => [User])
  taggedUsers: User[];
}
