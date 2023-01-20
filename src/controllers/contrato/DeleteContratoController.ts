import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteContratoController {

  async delete(req: Request, res: Response) {
    
    const {id} = req.body
    if (!id) {
      return res.status(400).json({ message: "id invalido"})
    }
    
    try {

      await prismaClient.contrato.delete(
      {
        where: {
          id
        }
      }
      )

      return res.status(200).json({message: "Contrato deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar contrato'
      })
    } 
  }
}
