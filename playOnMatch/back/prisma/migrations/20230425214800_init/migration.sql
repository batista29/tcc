-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idCriadorPartida_fkey` FOREIGN KEY (`idCriadorPartida`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncontroUsuario` ADD CONSTRAINT `EncontroUsuario_idParticipantePartida_fkey` FOREIGN KEY (`idParticipantePartida`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
