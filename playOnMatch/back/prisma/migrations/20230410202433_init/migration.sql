/*
  Warnings:

  - You are about to drop the column `id_user` on the `encontro` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `equipe` table. All the data in the column will be lost.
  - You are about to drop the column `id_equipe` on the `partida_campeonato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `encontro` DROP FOREIGN KEY `Encontro_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `equipe` DROP FOREIGN KEY `Equipe_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `partida_campeonato` DROP FOREIGN KEY `Partida_campeonato_id_equipe_fkey`;

-- AlterTable
ALTER TABLE `encontro` DROP COLUMN `id_user`;

-- AlterTable
ALTER TABLE `equipe` DROP COLUMN `id_user`;

-- AlterTable
ALTER TABLE `partida_campeonato` DROP COLUMN `id_equipe`;

-- CreateTable
CREATE TABLE `EncontroUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_encontro` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioEquipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_equipe` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipePartidaCamp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_equipe` INTEGER NOT NULL,
    `id_partidaCamp` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_id_encontro_fkey` FOREIGN KEY (`id_encontro`) REFERENCES `Encontro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioEquipe` ADD CONSTRAINT `UsuarioEquipe_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioEquipe` ADD CONSTRAINT `UsuarioEquipe_id_equipe_fkey` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipePartidaCamp` ADD CONSTRAINT `EquipePartidaCamp_id_equipe_fkey` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipePartidaCamp` ADD CONSTRAINT `EquipePartidaCamp_id_partidaCamp_fkey` FOREIGN KEY (`id_partidaCamp`) REFERENCES `Partida_campeonato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
