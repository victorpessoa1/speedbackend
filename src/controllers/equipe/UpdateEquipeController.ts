import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateEquipeController {

  async update(req: Request, res: Response) {
    const {lider, vendedor} = req.body
    const {uuid} = req.params

    try {

      const equipeAtualizado = await prismaClient.equipe.update(
      {
        where: { idEquipe: uuid },
        data: { 
          lider,
          vendedor
        }
      }
      )

      return res.status(200).json(equipeAtualizado)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao atualizar equipe'
      })
    } 
  }
}