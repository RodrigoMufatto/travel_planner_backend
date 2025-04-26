/*
  Warnings:

  - You are about to alter the column `price` on the `general_flights` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `rating` on the `hotels` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `rating` on the `restaurants` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "general_flights" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0.00,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "hotels" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0.00,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "restaurants" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0.00,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(10,2);
