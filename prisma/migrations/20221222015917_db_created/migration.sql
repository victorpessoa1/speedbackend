-- CreateTable
CREATE TABLE "Colaborador" (
    "uuid" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("uuid")
);

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DPessoaisColaborador_pkey" PRIMARY KEY ("colaborador_uuid")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "lider" TEXT NOT NULL,
    "vendedor" TEXT NOT NULL,
    "idEquipe" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("idEquipe")
);

-- CreateTable
CREATE TABLE "Funcao" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Funcao_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "colaborador_has_funcao" (
    "uuid" TEXT NOT NULL,
    "colaborador_uuid" TEXT NOT NULL,
    "funcao_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colaborador_has_funcao_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "uuid" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "colaborador_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "EnderecoCliente" (
    "cliente_uuid" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnderecoCliente_pkey" PRIMARY KEY ("cliente_uuid")
);

-- CreateTable
CREATE TABLE "DPessoaisCliente" (
    "cliente_uuid" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "oExpedidor" TEXT NOT NULL,
    "eCivel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DPessoaisCliente_pkey" PRIMARY KEY ("cliente_uuid")
);

-- CreateTable
CREATE TABLE "DadosBancariosCliente" (
    "cc" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "agencia" TEXT NOT NULL,
    "cliente_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DadosBancariosCliente_pkey" PRIMARY KEY ("cliente_uuid")
);

-- CreateTable
CREATE TABLE "TipoConsorcio" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("boletos_id")
);

-- CreateTable
CREATE TABLE "Contemplacao" (
    "contemplacao_id" SERIAL NOT NULL,
    "tipoContemplacao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "lance" DOUBLE PRECISION NOT NULL,
    "nContrato" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contemplacao_pkey" PRIMARY KEY ("contemplacao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_cpf_key" ON "Colaborador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "DPessoaisColaborador_rg_key" ON "DPessoaisColaborador"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "DPessoaisCliente_rg_key" ON "DPessoaisCliente"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Financeira_cnpj_key" ON "Financeira"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Financeira_razaoSocial_key" ON "Financeira"("razaoSocial");

-- CreateIndex
CREATE UNIQUE INDEX "Financeira_contrato_key" ON "Financeira"("contrato");

-- AddForeignKey
ALTER TABLE "EnderecoColaborador" ADD CONSTRAINT "EnderecoColaborador_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DPessoaisColaborador" ADD CONSTRAINT "DPessoaisColaborador_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_lider_fkey" FOREIGN KEY ("lider") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_vendedor_fkey" FOREIGN KEY ("vendedor") REFERENCES "DPessoaisColaborador"("colaborador_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador_has_funcao" ADD CONSTRAINT "colaborador_has_funcao_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador_has_funcao" ADD CONSTRAINT "colaborador_has_funcao_funcao_uuid_fkey" FOREIGN KEY ("funcao_uuid") REFERENCES "Funcao"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoCliente" ADD CONSTRAINT "EnderecoCliente_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DPessoaisCliente" ADD CONSTRAINT "DPessoaisCliente_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosBancariosCliente" ADD CONSTRAINT "DadosBancariosCliente_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

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
