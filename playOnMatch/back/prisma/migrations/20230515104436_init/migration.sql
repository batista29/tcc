/*
  Warnings:

  - A unique constraint covering the columns `[idUsuario,idEncontro]` on the table `favoritos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cidade]` on the table `Local` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pais]` on the table `Local` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `favoritos_idUsuario_idEncontro_key` ON `favoritos`(`idUsuario`, `idEncontro`);

-- CreateIndex
CREATE UNIQUE INDEX `Local_cidade_key` ON `Local`(`cidade`);

-- CreateIndex
CREATE UNIQUE INDEX `Local_pais_key` ON `Local`(`pais`);
