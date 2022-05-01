import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { Photo } from '../models/photo.model';

@Resolver((of) => Photo)
export class PhotoResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query((_returns) => [Photo])
  async photos() {
    const results = await this.prisma.photo.findMany({
      include: {
        photoTaggedUsers: {
          include: {
            taggedUser: true,
          },
        },
      },
    });

    return results.map((photo) => ({
      id: photo.id,
      taggedUsers: photo.photoTaggedUsers.map((record) => ({
        id: record.taggedUser.id,
        name: record.taggedUser.name,
        createdAt: record.taggedUser.createdAt,
      })),
    }));
  }
}
