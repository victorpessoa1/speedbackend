import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateClienteController {

  async update(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo} = req.body
    const {uuid} = req.params
    
    const clienteAtualizado = await prismaClient.cliente.update(
      {
        where: { uuid },
        data: { 
          nomeCompleto,
          cpf,
          isAtivo  
        }
      }
    )
    return res.json(clienteAtualizado)
  }
  

}