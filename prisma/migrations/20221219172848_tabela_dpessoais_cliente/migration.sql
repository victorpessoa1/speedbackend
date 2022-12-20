-- CreateTable
CREATE TABLE "DPessoaisCliente" (
    "cliente_uuid" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "oExpedidor" TEXT NOT NULL,
    "eCivel" TEXT NOT NULL,

    CONSTRAINT "DPessoaisCliente_pkey" PRIMARY KEY ("cliente_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "DPessoaisCliente_rg_key" ON "DPessoaisCliente"("rg");

-- AddForeignKey
ALTER TABLE "DPessoaisCliente" ADD CONSTRAINT "DPessoaisCliente_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
