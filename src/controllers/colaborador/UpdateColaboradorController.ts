import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateColaboradorController {

  async update(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo} = req.body
    const {uuid} = req.params

    try {

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

      return res.status(200).json(colaboradorAtualizado)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao atualizar colaborador'
      })
    } 
  }
}