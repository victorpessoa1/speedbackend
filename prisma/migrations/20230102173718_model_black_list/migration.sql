-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_colaborador_uuid_fkey";

-- DropForeignKey
ALTER TABLE "DPessoaisColaborador" DROP CONSTRAINT "DPessoaisColaborador_colaborador_uuid_fkey";

-- DropForeignKey
ALTER TABLE "EnderecoColaborador" DROP CONSTRAINT "EnderecoColaborador_colaborador_uuid_fkey";

-- DropForeignKey
ALTER TABLE "colaborador_has_funcao" DROP CONSTRAINT "colaborador_has_funcao_colaborador_uuid_fkey";

-- DropForeignKey
ALTER TABLE "login" DROP CONSTRAINT "login_colaborador_uuid_fkey";

-- CreateTable
CREATE TABLE "blacklist" (
    "tokenexpirado" TEXT NOT NULL,

    CONSTRAINT "blacklist_pkey" PRIMARY KEY ("tokenexpirado")
);

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoColaborador" ADD CONSTRAINT "EnderecoColaborador_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DPessoaisColaborador" ADD CONSTRAINT "DPessoaisColaborador_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador_has_funcao" ADD CONSTRAINT "colaborador_has_funcao_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_colaborador_uuid_fkey" FOREIGN KEY ("colaborador_uuid") REFERENCES "Colaborador"("uuid") ON DELETE NO ACTION ON UPDATE CASCADE;
