import { Colaborador } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

type LCAColaboradorRequest = {
    uuid: string
    funcao: String[]
    permissao: String[]
}


export class CreateListaDeControleDeAcessoDeColaboradorController {
    async handle({uuid, funcao, permissao}: LCAColaboradorRequest): Promise<Colaborador | undefined | Error> {
       
        const colaborador = await prismaClient.colaborador.findUnique({where: {uuid}})
        if (!colaborador) {
            return new Error('Colaborador não encontrado')
        }


        const permissaoExiste = await prismaClient.colaborador_has_permissao.findMany({where:{
            Permissao: permissao}})

        const funcaoExiste = await prismaClient.funcao.findFirst({where:{funcao}})
    }
}