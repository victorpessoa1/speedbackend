import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteContratoController {

  async delete(req: Request, res: Response) {
    
    const {nContrato} = req.body
    if (!nContrato) {
      return res.status(400).json({ message: "nContrato invalido"})
    }
    
    try {

      await prismaClient.contrato.delete(
      {
        where: {
          nContrato
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
