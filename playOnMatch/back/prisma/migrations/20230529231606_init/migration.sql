/*
  Warnings:

  - You are about to drop the column `profile_image` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `profile_image`,
    ADD COLUMN `image` LONGBLOB NULL;
