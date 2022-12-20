import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateClienteController {
  async handle(req: Request, res: Response) {
  const {nomeCompleto, cpf, isAtivo} = req.body
  const {colaborador_uuid} = req.params
  
  const cliente = await prismaClient.cliente.create({
    data: {
      nomeCompleto,
      cpf,
      isAtivo,
      colaborador_uuid
    },
  })
  

  return res.json(cliente)
  }
}