/*
  Warnings:

  - You are about to drop the column `end_date` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `trips` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destinations" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "end_date",
DROP COLUMN "start_date";
