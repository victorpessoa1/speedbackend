import { hash } from 'bcryptjs';
import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateColaboradorController {
  async handle(req: Request, res: Response) {
  const {nomeCompleto, cpf, isAtivo, email, senha, acesso} = req.body
  const hash_senha = await hash(senha, 12)
  
  const colaborador = await prismaClient.colaborador.create({
    data: {
      nomeCompleto,
      cpf,
      isAtivo,
      login: {
        create: {
          email,
          senha: hash_senha,
          acesso,
          autorizado: false

      }
    },
  }})
  

  return res.json(colaborador)
  }
}