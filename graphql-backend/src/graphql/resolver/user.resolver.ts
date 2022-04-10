import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { User } from '../models/user.model';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((_returns) => User)
  async users(@Args('id', { type: () => String }) id: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return {
      id: result.id,
      name: result.name,
      createdAt: result.createdAt,
    };
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    const result = await this.prisma.post.findMany({
      where: {
        postUserId: id,
      },
    });

    return result.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    }));
  }

  @Mutation((returs) => User)
  async updateUser(
    @Args({ name: 'id', type: () => String }) userId: string,
    @Args({ name: 'name', type: () => String }) name: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('not found user');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
      },
    });

    return {
      id: user.id,
      name: updatedUser.name,
      createdAt: user.createdAt,
    };
  }

  @Mutation((returs) => User)
  async createUser(@Args({ name: 'name', type: () => String }) name: string) {
    const user = await this.prisma.user.create({
      data: {
        id: ulid(),
        name: name,
        createdAt: new Date(),
      },
    });

    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
