/*
  Warnings:

  - Added the required column `updated_at` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
