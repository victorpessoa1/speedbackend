import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteEquipeController {

  async delete(req: Request, res: Response) {
    
    const {uuid} = req.params

    try {

      await prismaClient.equipe.delete(
        {
          where: {
            idEquipe: uuid
          }
        }
      )

      return res.status(200).json({message: "equipe deletado"})

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao deletar um colabrador'
      })
    }
  }
}
