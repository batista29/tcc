-- DropForeignKey
ALTER TABLE `lista_amigos` DROP FOREIGN KEY `Lista_amigos_idAmigo_fkey`;

-- AlterTable
ALTER TABLE `lista_amigos` MODIFY `idAmigo` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idAmigo_fkey` FOREIGN KEY (`idAmigo`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
