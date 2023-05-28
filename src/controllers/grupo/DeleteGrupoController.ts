import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteGrupoController {

  async delete(req: Request, res: Response) {
    
    const {uuid} = req.params
    if (!uuid) {
      return res.status(400).json({ message: "grupo invalida"})
    }
    
    try {

      await prismaClient.grupo.delete(
      {
        where: {
          uuid
        }
      }
      )

      return res.status(200).json({message: "grupo deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar grupo'
      })
    } 
  }
}
