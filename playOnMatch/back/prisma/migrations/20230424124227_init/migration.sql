/*
  Warnings:

  - You are about to drop the column `id_usuario` on the `encontrousuario` table. All the data in the column will be lost.
  - Added the required column `idCriadorPartida` to the `EncontroUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `encontrousuario` DROP FOREIGN KEY `EncontroUsuario_id_usuario_fkey`;

-- AlterTable
ALTER TABLE `encontrousuario` DROP COLUMN `id_usuario`,
    ADD COLUMN `idCriadorPartida` INTEGER NOT NULL,
    ADD COLUMN `idParticipantePartida` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idCriadorPartida_fkey` FOREIGN KEY (`idCriadorPartida`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idParticipantePartida_fkey` FOREIGN KEY (`idParticipantePartida`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
