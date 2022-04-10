import { Prisma, PrismaClient, User } from '@prisma/client';
import { ulid } from 'ulid';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    id: ulid(),
    name: 'user1',
    createdAt: new Date(),
  },
  {
    id: ulid(),
    name: 'user2',
    createdAt: new Date(),
  },
];

type StatusInput = {
  status: string;
  createdAt: Date;
};
const statusInput = (status: string, date: Date): StatusInput => ({
  status,
  createdAt: date,
});
const closeStatus = () => statusInput('closed', new Date());
const openStatus = () => statusInput('open', new Date());
const draftStatus = () => statusInput('draft', new Date());

const postData = (
  userId: string,
  statuses: StatusInput[],
): Prisma.PostCreateInput => {
  return {
    id: ulid(),
    postUser: {
      connect: { id: userId },
    },
    title: 'title',
    body: 'body',
    postStatusActivities: {
      createMany: { data: statuses },
    },
  };
};

const main = async () => {
  await prisma.user.createMany({
    data: userData,
  });

  await Promise.all([
    ...userData.map(async (user) => {
      // open only
      await prisma.post.create({
        data: postData(user.id, [openStatus()]),
      });
      // open to close
      await prisma.post.create({
        data: postData(user.id, [openStatus(), closeStatus()]),
      });
      // open to draft
      await prisma.post.create({
        data: postData(user.id, [openStatus(), draftStatus()]),
      });
    }),
  ]);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
