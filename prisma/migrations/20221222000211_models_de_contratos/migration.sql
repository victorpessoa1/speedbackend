/*
  Warnings:

  - Added the required column `updatedAt` to the `Equipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TipoConsorcio" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoConsorcio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "nContrato" INTEGER NOT NULL,
    "cliente_uuid" TEXT NOT NULL,
    "colaborador_uuid" TEXT NOT NULL,
    "tipoConsorcio_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "vencimento" INTEGER NOT NULL,
    "valorBem" DOUBLE PRECISION NOT NULL,
    "modelo" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("nContrato")
);

-- CreateTable
CREATE TABLE "Financeira" (
    "financeira_id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "contrato" TEXT NOT NULL,
    "Gerente" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Financeira_pkey" PRIMARY KEY ("financeira_id")
);

-- CreateTable
CREATE TABLE "Boleto" (
    "boletos_id" SERIAL NOT NULL,
    "nContrato" INTEGER NOT NULL,
    "financeira_id" INTEGER NOT NULL,
    "parcela" DOUBLE PRECISION NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("boletos_id")
);

-- CreateTable
CREATE TABLE "Contemplacao" (
    "contemplacao_id" SERIAL NOT NULL,
    "tipoContemplacao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "lance" DOUBLE PRECISION NOT NULL,
    "nContrato" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contemplacao_pkey" PRIMARY KEY ("contemplacao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Financeira_cnpj_key" ON "Financeira"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Financeira_razaoSocial_key" ON "Financeira"("razaoSocial");

-- CreateIndex
CREATE UNIQUE INDEX "Financeira_contrato_key" ON "Financeira"("contrato");

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_tipoConsorcio_id_fkey" FOREIGN KEY ("tipoConsorcio_id") REFERENCES "TipoConsorcio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_nContrato_fkey" FOREIGN KEY ("nContrato") REFERENCES "Contrato"("nContrato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_financeira_id_fkey" FOREIGN KEY ("financeira_id") REFERENCES "Financeira"("financeira_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contemplacao" ADD CONSTRAINT "Contemplacao_nContrato_fkey" FOREIGN KEY ("nContrato") REFERENCES "Contrato"("nContrato") ON DELETE RESTRICT ON UPDATE CASCADE;
