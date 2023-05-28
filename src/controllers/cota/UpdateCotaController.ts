import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateCotaController {

  async update(req: Request, res: Response) {
    const {grupo_uuid, cota} = req.body
    const {uuid} = req.params

    try {
      const cotaAtualizada = await prismaClient.cota.update(
            {
              where: { uuid },
              data: { 
                grupo_uuid,
                cota,

              }
            }
          )
          return res.status(200).json(cotaAtualizada)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar cota" 
      })
    }
  }
}