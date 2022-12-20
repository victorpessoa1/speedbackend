import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateColaboradorController {
  async handle(req: Request, res: Response) {
  const {nomeCompleto, cpf, isAtivo} = req.body
  
  const colaborador = await prismaClient.colaborador.create({
    data: {
      nomeCompleto,
      cpf,
      isAtivo
    },
  })
  

  return res.json(colaborador)
  }
}