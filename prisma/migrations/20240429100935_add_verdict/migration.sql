/*
  Warnings:

  - Changed the type of `verdict` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "verdict",
ADD COLUMN     "verdict" "Verdict" NOT NULL;
