import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { Post } from '../models/post.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((returns) => [Post])
  async posts() {
    const result = await this.prisma.post.findMany({
      include: {
        postUser: true,
      },
    });

    return result.map((data) => ({
      id: data.id,
      title: data.title,
      body: data.body,
      user: data.postUser,
    }));
  }

  @Mutation((returns) => Post)
  async createPost(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'body', type: () => String }) body: string,
  ) {
    const post = await this.prisma.post.create({
      data: {
        id: ulid(),
        postUserId: userId,
        title: title,
        body: body,
        postStatusActivities: {
          create: {
            status: 'opened',
            createdAt: new Date(),
          },
        },
      },
    });

    return {
      id: post.id,
      title: post.title,
      body: post.body,
    };
  }
}
