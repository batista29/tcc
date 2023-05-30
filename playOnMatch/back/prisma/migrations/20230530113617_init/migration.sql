/*
  Warnings:

  - You are about to drop the `favoritos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favoritos` DROP FOREIGN KEY `favoritos_idEncontro_fkey`;

-- DropForeignKey
ALTER TABLE `favoritos` DROP FOREIGN KEY `favoritos_idUsuario_fkey`;

-- DropTable
DROP TABLE `favoritos`;
