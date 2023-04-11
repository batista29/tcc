/*
  Warnings:

  - Added the required column `id_local` to the `Encontro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `encontro` ADD COLUMN `id_local` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `partida_campeonato` ADD COLUMN `localId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Local` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Encontro` ADD CONSTRAINT `Encontro_id_local_fkey` FOREIGN KEY (`id_local`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida_campeonato` ADD CONSTRAINT `Partida_campeonato_localId_fkey` FOREIGN KEY (`localId`) REFERENCES `Local`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
