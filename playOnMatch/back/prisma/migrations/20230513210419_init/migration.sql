/*
  Warnings:

  - You are about to drop the column `cep` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `Local` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `local` ADD COLUMN `bairro` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `cep`;
