import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateClienteController {

  async update(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo} = req.body
    const {uuid} = req.params

    try {
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
          return res.status(200).json(clienteAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar cliente" 
      })
    }
  }
}