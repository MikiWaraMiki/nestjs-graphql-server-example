import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '../models/post.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((_returns) => [Post])
  async posts() {
    const result = await this.prisma.post.findMany();

    return result.map((data) => ({
      id: data.id,
      title: data.title,
      body: data.body,
    }));
  }
}
