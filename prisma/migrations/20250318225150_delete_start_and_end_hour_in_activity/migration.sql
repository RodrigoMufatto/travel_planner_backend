/*
  Warnings:

  - You are about to drop the column `date` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `end_hour` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `start_hour` on the `activities` table. All the data in the column will be lost.
  - Added the required column `start_date` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "date",
DROP COLUMN "end_hour",
DROP COLUMN "start_hour",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
