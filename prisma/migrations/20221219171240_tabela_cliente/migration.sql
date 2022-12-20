-- CreateTable
CREATE TABLE "Cliente" (
    "uuid" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,
    "colaborador_uuid" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
