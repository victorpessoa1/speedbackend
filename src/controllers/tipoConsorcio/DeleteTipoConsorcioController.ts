import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteTipoConsorcioController {

  async delete(req: Request, res: Response) {
    
    const {id} = req.params
    if (!id) {
      return res.status(400).json({ message: "id invalido"})
    }
    
    try {

      await prismaClient.tipoConsorcio.delete(
      {
        where: {
          id: Number(id)
        }
      }
      )

      return res.status(200).json({message: "Tipo consórcio deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar tipo de consorcio'
      })
    } 
  }
}
