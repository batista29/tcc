-- CreateTable
CREATE TABLE `Local` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `referencia` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EncontroUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_encontro` INTEGER NOT NULL,
    `idCriadorPartida` INTEGER NOT NULL,
    `idParticipantePartida` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Encontro` ADD CONSTRAINT `Encontro_id_local_fkey` FOREIGN KEY (`id_local`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_id_encontro_fkey` FOREIGN KEY (`id_encontro`) REFERENCES `Encontro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
