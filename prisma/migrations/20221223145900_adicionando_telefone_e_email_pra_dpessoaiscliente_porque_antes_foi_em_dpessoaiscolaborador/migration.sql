/*
  Warnings:

  - Added the required column `email` to the `DPessoaisCliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `DPessoaisCliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DPessoaisCliente" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;
