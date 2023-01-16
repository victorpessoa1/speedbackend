import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteFinanceiraController {

  async delete(req: Request, res: Response) {
    
    const {financeira_id} = req.params
    if (!financeira_id) {
      return res.status(400).json({ message: "financeira invalida"})
    }
    
    try {

      await prismaClient.financeira.delete(
      {
        where: {
          financeira_id: Number(financeira_id)
        }
      }
      )

      return res.status(200).json({message: "financeira deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar financeira'
      })
    } 
  }
}
