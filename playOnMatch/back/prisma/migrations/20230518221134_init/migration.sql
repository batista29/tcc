/*
  Warnings:

  - Added the required column `remetente` to the `Lista_amigos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lista_amigos` ADD COLUMN `remetente` INTEGER NOT NULL;
