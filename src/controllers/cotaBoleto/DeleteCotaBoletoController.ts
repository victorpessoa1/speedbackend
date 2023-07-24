import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteCotaBoletoController {

  async delete(req: Request, res: Response) {
    
    const {uuid} = req.params
    if (!uuid) {
      return res.status(400).json({ message: "uuid invalido"})
    }
    
    try {

      await prismaClient.cotaBoleto.delete(
      {
        where: {
          uuid
        }
      }
      )

      return res.status(200).json({message: "cotaBoleto deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar cotaBoleto'
      })
    } 
  }
}
