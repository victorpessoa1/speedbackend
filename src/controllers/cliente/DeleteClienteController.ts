import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteClienteController {

  async delete(req: Request, res: Response) {
    const {uuid} = req.params
    
    await prismaClient.cliente.delete(
      {
        where: {
          uuid
        }
      }
    )
    return res.json({message: "cliente deletado"})
  }
  

}
