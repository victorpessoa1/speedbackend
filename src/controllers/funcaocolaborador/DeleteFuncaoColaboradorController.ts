import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteFuncaoColaboradorController {

  async delete(req: Request, res: Response) {
    
    const {uuid} = req.params
    if (!uuid) {
      return res.status(400).json({ message: "funcaoColaborador invalida"})
    }
    
    try {

      await prismaClient.funcao.delete(
      {
        where: {
          uuid
        }
      }
      )

      return res.status(200).json({message: "funcaoColaborador deletado"})

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'falha ao deletar funcaoColaborador'
      })
    } 
  }
}
