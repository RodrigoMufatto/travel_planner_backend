/*
  Warnings:

  - You are about to drop the column `end_date` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `destinations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "destinations" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
