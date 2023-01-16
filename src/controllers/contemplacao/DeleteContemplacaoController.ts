import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteContemplacaoController {

  async delete(req: Request, res: Response) {
    
    const {contemplacao_id} = req.params
    if (!contemplacao_id) {
      return res.status(400).json({ message: "contemplação invalida"})
    }
    
    try {

      await prismaClient.contemplacao.delete(
      {
        where: {
          contemplacao_id: Number(contemplacao_id)
        }
      }
      )

      return res.status(200).json({message: "contemplação deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar contemplação'
      })
    } 
  }
}
