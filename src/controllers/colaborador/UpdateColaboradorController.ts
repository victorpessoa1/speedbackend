import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateColaboradorController {

  async update(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo} = req.body
    const {uuid} = req.params
    
    const colaboradorAtualizado = await prismaClient.colaborador.update(
      {
        where: { uuid },
        data: { 
          nomeCompleto,
          cpf,
          isAtivo  
        }
      }
    )
    return res.json(colaboradorAtualizado)
  }
  

}