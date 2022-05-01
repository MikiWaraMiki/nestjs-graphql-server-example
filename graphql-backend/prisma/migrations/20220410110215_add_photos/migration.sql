-- CreateTable
CREATE TABLE "photos" (
    "id" VARCHAR(26) NOT NULL,
    "post_user_id" VARCHAR(26) NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_tagged_user" (
    "photo_id" VARCHAR(26) NOT NULL,
    "tagged_user_id" VARCHAR(26) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "photo_tagged_user_pkey" PRIMARY KEY ("photo_id","tagged_user_id")
);

-- AddForeignKey
ALTER TABLE "photo_tagged_user" ADD CONSTRAINT "photo_tagged_user_tagged_user_id_fkey" FOREIGN KEY ("tagged_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_tagged_user" ADD CONSTRAINT "photo_tagged_user_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
