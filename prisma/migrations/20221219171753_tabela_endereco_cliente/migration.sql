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

    CONSTRAINT "EnderecoCliente_pkey" PRIMARY KEY ("cliente_uuid")
);

-- AddForeignKey
ALTER TABLE "EnderecoCliente" ADD CONSTRAINT "EnderecoCliente_cliente_uuid_fkey" FOREIGN KEY ("cliente_uuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
