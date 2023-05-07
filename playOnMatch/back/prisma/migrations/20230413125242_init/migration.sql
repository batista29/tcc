/*
  Warnings:

  - You are about to drop the `campeonato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipepartidacamp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partida_campeonato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarioequipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `campeonato` DROP FOREIGN KEY `Campeonato_id_criador_fkey`;

-- DropForeignKey
ALTER TABLE `equipepartidacamp` DROP FOREIGN KEY `EquipePartidaCamp_id_equipe_fkey`;

-- DropForeignKey
ALTER TABLE `equipepartidacamp` DROP FOREIGN KEY `EquipePartidaCamp_id_partidaCamp_fkey`;

-- DropForeignKey
ALTER TABLE `partida_campeonato` DROP FOREIGN KEY `Partida_campeonato_id_camp_fkey`;

-- DropForeignKey
ALTER TABLE `partida_campeonato` DROP FOREIGN KEY `Partida_campeonato_localId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarioequipe` DROP FOREIGN KEY `UsuarioEquipe_id_equipe_fkey`;

-- DropForeignKey
ALTER TABLE `usuarioequipe` DROP FOREIGN KEY `UsuarioEquipe_id_usuario_fkey`;

-- DropTable
DROP TABLE `campeonato`;

-- DropTable
DROP TABLE `equipe`;

-- DropTable
DROP TABLE `equipepartidacamp`;

-- DropTable
DROP TABLE `partida_campeonato`;

-- DropTable
DROP TABLE `usuarioequipe`;

-- CreateTable
CREATE TABLE `Lista_amigos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeAmigo` VARCHAR(191) NULL,
    `idAmigo` INTEGER NOT NULL,
    `idDono` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idAmigo_fkey` FOREIGN KEY (`idAmigo`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idDono_fkey` FOREIGN KEY (`idDono`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
