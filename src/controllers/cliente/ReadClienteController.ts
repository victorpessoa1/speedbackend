import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadClienteController {
  
  async clientes(req: Request, res: Response) {
  // const {colaborador_uuid} = req.params
  
  const clientes = await prismaClient.cliente.findMany()
  
  return res.json(clientes)
  }


  async cliente(req: Request, res: Response) {
    const {uuid} = req.params
    
    const cliente = await prismaClient.cliente.findUnique({
      where: {
        uuid
      }
    })
    
    return res.json(cliente)
  }
  

}
