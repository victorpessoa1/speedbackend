import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteBoletoController {

  async delete(req: Request, res: Response) {
    
    const {boleto_id} = req.body
    if (!boleto_id) {
      return res.status(400).json({ message: "boleto invalido"})
    }
    
    try {

      await prismaClient.boleto.delete(
      {
        where: {
          boleto_id
        }
      }
      )

      return res.status(200).json({message: "Boleto deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar boleto'
      })
    } 
  }
}
