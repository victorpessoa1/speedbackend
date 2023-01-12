import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';


export class CreateFuncaoController {
    async createFuncao(req: Request, res: Response) {
    const {descricao} = req.body

    if(await prismaClient.funcao.findUnique({where:  {descricao} })){
      return res.status(400).json({
        message: 'função já existe'
      })
    }

    const funcao = await prismaClient.funcao.create({
      data:{
        descricao
      }
    })

    return res.status(200).json(funcao)
  }
}