import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';


export class CreatePermissaoController {
    async createpermissao(req: Request, res: Response) {
    const {descricao} = req.body

    if(await prismaClient.permissao.findUnique({where:  {descricao} })){
      return res.status(400).json({
        message: 'permissão já existe'
      })
    }

    const permissao = await prismaClient.permissao.create({
      data:{
        descricao
      }
    })

    return res.status(200).json(permissao)
  }
}