/*
  Warnings:

  - You are about to alter the column `cost` on the `activities` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "cost" SET DEFAULT 0.00,
ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,2);
