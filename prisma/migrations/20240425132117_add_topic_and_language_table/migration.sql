/*
  Warnings:

  - You are about to drop the column `language` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `TestCase` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "language",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "language",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "language",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Language";

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProblemToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProblemToTopic_AB_unique" ON "_ProblemToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_ProblemToTopic_B_index" ON "_ProblemToTopic"("B");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTopic" ADD CONSTRAINT "_ProblemToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTopic" ADD CONSTRAINT "_ProblemToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
