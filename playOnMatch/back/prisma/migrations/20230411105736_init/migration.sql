/*
  Warnings:

  - You are about to drop the column `id_local` on the `encontro` table. All the data in the column will be lost.
  - You are about to drop the `local` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `encontro` DROP FOREIGN KEY `Encontro_id_local_fkey`;

-- DropForeignKey
ALTER TABLE `partida_campeonato` DROP FOREIGN KEY `Partida_campeonato_id_local_fkey`;

-- AlterTable
ALTER TABLE `encontro` DROP COLUMN `id_local`;

-- AlterTable
ALTER TABLE `usuario` MODIFY `cep` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `local`;
