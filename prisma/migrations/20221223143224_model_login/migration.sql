-- CreateTable
CREATE TABLE "login" (
    "colaborador_uuid" TEXT NOT NULL,
    "autorizado" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "acesso" INTEGER NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("colaborador_uuid")
);

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
