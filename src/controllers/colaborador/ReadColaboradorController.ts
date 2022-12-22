import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadColaboradorController {
  
  async colaboradores(req: Request, res: Response) {
  
  const colaboradores = await prismaClient.colaborador.findMany()
  
  return res.json(colaboradores)
  }


  async colaborador(req: Request, res: Response) {
    const {uuid} = req.params
    
    const colaborador = await prismaClient.colaborador.findUnique({
      where: {
        uuid
      }
    })
    
    return res.json(colaborador)
  }
  

}
