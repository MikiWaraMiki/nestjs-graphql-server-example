import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoResolver } from './graphql/resolver/photo.resolver';
import { PostResolver } from './graphql/resolver/post.resolver';
import { UserResolver } from './graphql/resolver/user.resolver';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    PostResolver,
    UserResolver,
    PhotoResolver,
  ],
})
export class AppModule {}
