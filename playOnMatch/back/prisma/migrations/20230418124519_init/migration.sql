/*
  Warnings:

  - You are about to drop the column `cep` on the `local` table. All the data in the column will be lost.
  - Added the required column `esporte` to the `Encontro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Local` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `encontro` ADD COLUMN `esporte` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `local` DROP COLUMN `cep`,
    ADD COLUMN `endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `referencia` VARCHAR(191) NULL;
