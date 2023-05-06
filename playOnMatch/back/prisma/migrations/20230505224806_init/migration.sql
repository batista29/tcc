-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `cep` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lista_amigos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAmigo` INTEGER NULL,
    `idCriador` INTEGER NOT NULL,
    `situacao` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Encontro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `id_local` INTEGER NOT NULL,
    `esporte` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idAmigo_fkey` FOREIGN KEY (`idAmigo`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lista_amigos` ADD CONSTRAINT `Lista_amigos_idCriador_fkey` FOREIGN KEY (`idCriador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Encontro` ADD CONSTRAINT `Encontro_id_local_fkey` FOREIGN KEY (`id_local`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idCriadorPartida_fkey` FOREIGN KEY (`idCriadorPartida`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idParticipantePartida_fkey` FOREIGN KEY (`idParticipantePartida`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_id_encontro_fkey` FOREIGN KEY (`id_encontro`) REFERENCES `Encontro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
