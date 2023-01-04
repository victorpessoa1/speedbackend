/*
  Warnings:

  - Added the required column `updated_at` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blacklist" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "login" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
