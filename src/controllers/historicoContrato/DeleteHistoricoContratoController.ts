import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteHistoricoContratoController {

  async delete(req: Request, res: Response) {
    
    const {id} = req.params
    if (!id) {
      return res.status(400).json({ message: "uuid invalido"})
    }
    
    try {

      await prismaClient.historicoContrato.delete(
      {
        where: {
          id: Number(id)
        }
      }
      )

      return res.status(200).json({message: "Contrato deletada"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar historicoContrato'
      })
    } 
  }
}
