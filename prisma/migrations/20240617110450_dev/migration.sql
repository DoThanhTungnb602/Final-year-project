/*
  Warnings:

  - The values [TEACHER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionUrl` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the `Solution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestCase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProblemToTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `editorValue` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('ARRAY', 'STRING', 'HASH_TABLE', 'DYNAMIC_PROGRAMMING', 'MATH', 'SORTING', 'GREEDY', 'DEPTH_FIRST_SEARCH', 'DATABASE', 'BINARY_SEARCH', 'TREE', 'BREADTH_FIRST_SEARCH', 'MATRIX', 'BIT_MANIPULATION', 'TWO_POINTERS', 'BINARY_TREE', 'HEAP', 'PREFIX_SUM', 'STACK', 'SIMULATION', 'GRAPH', 'COUNTING', 'DESIGN', 'SLIDING_WINDOW', 'BACKTRACKING', 'ENUMERATION', 'UNION_FIND', 'LINKED_LIST', 'ORDERED_SET', 'MONOTONIC_STACK', 'NUMBER_THEORY', 'TRIE', 'DIVIDE_AND_CONQUER', 'BITMASK', 'RECURSION', 'SEGMENT_TREE', 'QUEUE', 'BINARY_SEARCH_TREE', 'MEMOIZATION', 'GEOMETRY', 'BINARY_INDEXED_TREE', 'HASH_FUNCTION', 'COMBINATORICS', 'TOPOLOGICAL_SORT', 'STRING_MATCHING', 'SHORTEST_PATH', 'ROLLING_HASH', 'GAME_THEORY', 'INTERACTIVE', 'DATA_STREAM', 'BRAINTEASER', 'MONOTONIC_QUEUE', 'RANDOMIZED', 'MERGE_SORT', 'ITERATOR', 'CONCURRENCY', 'DOUBLY_LINKED_LIST', 'PROBABILITY_AND_STATISTICS', 'QUICKSELECT', 'BUCKET_SORT', 'SUFFIX_ARRAY', 'MINIMUM_SPANNING_TREE', 'COUNTING_SORT', 'SHELL', 'LINE_SWEEP', 'RESERVOIR_SAMPLING', 'STRONGLY_CONNECTED_COMPONENT', 'EULERIAN_CIRCUIT', 'RADIX_SORT', 'REJECTION_SAMPLING', 'BICONNECTED_COMPONENT');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_classId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_languageId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_problemId_fkey";

-- DropForeignKey
ALTER TABLE "_ProblemToTopic" DROP CONSTRAINT "_ProblemToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProblemToTopic" DROP CONSTRAINT "_ProblemToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "teacherId";

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "editorValue" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "classId",
DROP COLUMN "descriptionUrl",
DROP COLUMN "name",
ADD COLUMN     "exerciseId" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL,
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "tags" "Topic"[],
ADD COLUMN     "testId" TEXT,
ADD COLUMN     "testcases" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "exerciseId" TEXT,
ADD COLUMN     "testId" TEXT;

-- DropTable
DROP TABLE "Solution";

-- DropTable
DROP TABLE "TestCase";

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "_ProblemToTopic";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assignedDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "classId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "classId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
