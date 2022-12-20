-- CreateTable
CREATE TABLE "Colaborador" (
    "uuid" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "isAtivo" BOOLEAN NOT NULL,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_cpf_key" ON "Colaborador"("cpf");
