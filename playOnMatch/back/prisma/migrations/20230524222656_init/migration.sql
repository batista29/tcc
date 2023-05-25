-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lista_amigos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAmigo` INTEGER NULL,
    `idCriador` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `remetente` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Encontro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `dataHora` DATETIME(3) NOT NULL,
    `dataFim` DATETIME(3) NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `id_local` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idEncontro` INTEGER NOT NULL,

    UNIQUE INDEX `favoritos_idUsuario_idEncontro_key`(`idUsuario`, `idEncontro`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Local` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EncontroUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_encontro` INTEGER NOT NULL,
    `idCriadorPartida` INTEGER NOT NULL,
    `idParticipantePartida` INTEGER NULL,
    `status` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idAmigo_fkey` FOREIGN KEY (`idAmigo`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idCriador_fkey` FOREIGN KEY (`idCriador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Encontro` ADD CONSTRAINT `Encontro_id_local_fkey` FOREIGN KEY (`id_local`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_idEncontro_fkey` FOREIGN KEY (`idEncontro`) REFERENCES `Encontro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idCriadorPartida_fkey` FOREIGN KEY (`idCriadorPartida`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idParticipantePartida_fkey` FOREIGN KEY (`idParticipantePartida`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_id_encontro_fkey` FOREIGN KEY (`id_encontro`) REFERENCES `Encontro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
