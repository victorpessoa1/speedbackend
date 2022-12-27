import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteColaboradorController {

  async delete(req: Request, res: Response) {
    const {uuid} = req.params
    
    await prismaClient.colaborador.delete(
      {
        where: {
          uuid
        }
      }
    )
    return res.json({message: "colaborador deletado"})
  }
  

}
