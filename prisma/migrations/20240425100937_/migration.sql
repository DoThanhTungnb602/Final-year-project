/*
  Warnings:

  - You are about to drop the column `description` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'TEACHER';

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_classId_fkey";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "descriptionUrl" TEXT,
ALTER COLUMN "timeLimit" DROP NOT NULL,
ALTER COLUMN "memoryLimit" DROP NOT NULL,
ALTER COLUMN "classId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
