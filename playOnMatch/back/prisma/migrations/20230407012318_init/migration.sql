-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Local` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Encontro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `id_local` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campeonato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `esporte` VARCHAR(191) NOT NULL,
    `premio` DOUBLE NOT NULL,
    `valor_entrada` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `id_criador` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partida_campeonato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pontuacao` INTEGER NOT NULL,
    `id_local` INTEGER NOT NULL,
    `id_camp` INTEGER NOT NULL,
    `id_equipe` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Encontro` ADD CONSTRAINT `Encontro_id_local_fkey` FOREIGN KEY (`id_local`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Encontro` ADD CONSTRAINT `Encontro_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipe` ADD CONSTRAINT `Equipe_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campeonato` ADD CONSTRAINT `Campeonato_id_criador_fkey` FOREIGN KEY (`id_criador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida_campeonato` ADD CONSTRAINT `Partida_campeonato_id_local_fkey` FOREIGN KEY (`id_local`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida_campeonato` ADD CONSTRAINT `Partida_campeonato_id_camp_fkey` FOREIGN KEY (`id_camp`) REFERENCES `Campeonato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida_campeonato` ADD CONSTRAINT `Partida_campeonato_id_equipe_fkey` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
