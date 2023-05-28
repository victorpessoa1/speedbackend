import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteCotaController {

  async delete(req: Request, res: Response) {
    
    const {uuid} = req.params
    if (!uuid) {
      return res.status(400).json({ message: "cota invalida"})
    }
    
    try {

      await prismaClient.cota.delete(
      {
        where: {
          uuid
        }
      }
      )

      return res.status(200).json({message: "cota deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar cota'
      })
    } 
  }
}
