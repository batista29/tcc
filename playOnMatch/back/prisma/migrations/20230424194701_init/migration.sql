/*
  Warnings:

  - You are about to drop the column `idDono` on the `lista_amigos` table. All the data in the column will be lost.
  - You are about to drop the `encontrousuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `local` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idCriador` to the `Lista_amigos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `encontro` DROP FOREIGN KEY `Encontro_id_local_fkey`;

-- DropForeignKey
ALTER TABLE `encontrousuario` DROP FOREIGN KEY `EncontroUsuario_idCriadorPartida_fkey`;

-- DropForeignKey
ALTER TABLE `encontrousuario` DROP FOREIGN KEY `EncontroUsuario_idParticipantePartida_fkey`;

-- DropForeignKey
ALTER TABLE `encontrousuario` DROP FOREIGN KEY `EncontroUsuario_id_encontro_fkey`;

-- DropForeignKey
ALTER TABLE `lista_amigos` DROP FOREIGN KEY `Lista_amigos_idDono_fkey`;

-- AlterTable
ALTER TABLE `lista_amigos` DROP COLUMN `idDono`,
    ADD COLUMN `idCriador` INTEGER NOT NULL;

-- DropTable
DROP TABLE `encontrousuario`;

-- DropTable
DROP TABLE `local`;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idCriador_fkey` FOREIGN KEY (`idCriador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
