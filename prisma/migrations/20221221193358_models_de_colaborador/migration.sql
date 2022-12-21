-- CreateTable
CREATE TABLE "EnderecoColaborador" (
    "colaborador_uuid" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnderecoColaborador_pkey" PRIMARY KEY ("colaborador_uuid")
);

-- CreateTable
CREATE TABLE "DPessoaisColaborador" (
    "colaborador_uuid" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "oExpedidor" TEXT NOT NULL,
    "eCivel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DPessoaisColaborador_pkey" PRIMARY KEY ("colaborador_uuid")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "lider" TEXT NOT NULL,
    "vendedor" TEXT NOT NULL,
    "idEquipe" TEXT NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("idEquipe")
);

-- CreateTable
CREATE TABLE "Funcao" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Funcao_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "colaborador_has_funcao" (
    "uuid" TEXT NOT NULL,
    "colaboradorUuid" TEXT NOT NULL,
    "funcaoUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colaborador_has_funcao_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "DPessoaisColaborador_rg_key" ON "DPessoaisColaborador"("rg");

-- AddForeignKey
ALTER TABLE "EnderecoColaborador" ADD CONSTRAINT "EnderecoColaborador_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DPessoaisColaborador" ADD CONSTRAINT "DPessoaisColaborador_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_lider_fkey" FOREIGN KEY ("lider") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_vendedor_fkey" FOREIGN KEY ("vendedor") REFERENCES "DPessoaisColaborador"("colaborador_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador_has_funcao" ADD CONSTRAINT "colaborador_has_funcao_colaboradorUuid_fkey" FOREIGN KEY ("colaboradorUuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador_has_funcao" ADD CONSTRAINT "colaborador_has_funcao_funcaoUuid_fkey" FOREIGN KEY ("funcaoUuid") REFERENCES "Funcao"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
