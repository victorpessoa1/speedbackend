import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadClienteController {
  
  async clientes(req: Request, res: Response) {

    try {
      const clientes = await prismaClient.cliente.findMany()
  
      return res.status(200).json(clientes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os clientes'
    })
    }
  
  }


  async cliente(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const cliente = await prismaClient.cliente.findUnique({
        where: {
          uuid
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Cliente não encontrado'
    })
    }
    
  }
}
