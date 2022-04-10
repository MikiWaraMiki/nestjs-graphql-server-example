-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" VARCHAR(26) NOT NULL,
    "postUserId" VARCHAR(26) NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_status_activities" (
    "post_id" VARCHAR(26) NOT NULL,
    "status" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "post_status_activities_pkey" PRIMARY KEY ("post_id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_postUserId_fkey" FOREIGN KEY ("postUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_status_activities" ADD CONSTRAINT "post_status_activities_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
