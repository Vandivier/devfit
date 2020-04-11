# Migration `20200411165849-qq`

This migration has been generated by Ben Awad at 4/11/2020, 4:58:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Post.caption"

CREATE TABLE "public"."Tag" (
    "id" SERIAL,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Like" (
    "postId" integer  NOT NULL ,
    "userId" integer  NOT NULL ,
    PRIMARY KEY ("userId","postId")
) 

CREATE TABLE "public"."Comment" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL,
    "postId" integer  NOT NULL ,
    "text" text  NOT NULL ,
    "userId" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_TagToUser" (
    "A" integer  NOT NULL ,
    "B" integer  NOT NULL 
) 

ALTER TABLE "public"."Post" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "userId" integer  NOT NULL ,
ADD COLUMN "videoUrl" text   ,
ALTER COLUMN "caption" DROP NOT NULL;

ALTER TABLE "public"."User" ADD COLUMN "username" text  NOT NULL ;

CREATE UNIQUE INDEX "Tag.name" ON "public"."Tag"("name")

CREATE UNIQUE INDEX "_TagToUser_AB_unique" ON "public"."_TagToUser"("A","B")

CREATE  INDEX "_TagToUser_B_index" ON "public"."_TagToUser"("B")

CREATE UNIQUE INDEX "User.username" ON "public"."User"("username")

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TagToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Tag"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TagToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200411163628-a..20200411165849-qq
--- datamodel.dml
+++ datamodel.dml
@@ -1,21 +1,19 @@
 datasource postgresql {
-  url = "***"
+  url      = env("DATABASE_URL")
   provider = "postgresql"
 }
 generator client {
   provider = "prisma-client-js"
 }
-// model Song {
-// id       Int     @default(autoincrement()) @id
-// name     String
-// artist   Artist? @relation(fields: [artistId], references: [id])
-// artistId Int?
-// }
 model User {
-  id Int @default(autoincrement()) @id
+  id       Int    @default(autoincrement()) @id
+  username String @unique
+  posts    Post[]
+  likes    Like[]
+  tags     Tag[]  @relation(references: [id])
 }
 model Challenge {
   id             Int    @default(autoincrement()) @id
@@ -24,10 +22,40 @@
   name           String
   posts          Post[]
 }
+model Tag {
+  id    Int    @default(autoincrement()) @id
+  name  String @unique
+  users User[] @relation(references: [id])
+}
+
 model Post {
   id          Int       @default(autoincrement()) @id
-  caption     String    @unique
+  caption     String?
+  videoUrl    String?
   challenge   Challenge @relation(fields: [challengeId], references: [id])
   challengeId Int
+  createdAt   DateTime  @default(now())
+  user        User      @relation(fields: [userId], references: [id])
+  userId      Int
+  likes       Like[]
+}
+
+model Like {
+  user   User @relation(fields: [userId], references: [id])
+  userId Int
+  post   Post @relation(fields: [postId], references: [id])
+  postId Int
+
+  @@id([userId, postId])
+}
+
+model Comment {
+  id        Int      @default(autoincrement()) @id
+  text      String
+  user      User     @relation(fields: [userId], references: [id])
+  userId    Int
+  post      Post     @relation(fields: [postId], references: [id])
+  postId    Int
+  createdAt DateTime @default(now())
 }
```

