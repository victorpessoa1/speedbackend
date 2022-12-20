-- CreateTable
CREATE TABLE "DadosBancariosCliente" (
    "cc" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "agencia" TEXT NOT NULL,
    "cliente_uuid" TEXT NOT NULL,

    CONSTRAINT "DadosBancariosCliente_pkey" PRIMARY KEY ("cliente_uuid")
);

-- AddForeignKey
ALTER TABLE "DadosBancariosCliente" ADD CONSTRAINT "DadosBancariosCliente_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
