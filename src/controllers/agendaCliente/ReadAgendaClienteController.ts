import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadAgendaClienteController {
  
  async exibirClientesGlobal(req: Request, res: Response) {

    try {
      const clientes = await prismaClient.agendaCliente.findMany()
  
      return res.status(200).json(clientes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os clientes'
    })
    }
  
  }

  async exibirClientesDoColaborador(req: Request, res: Response) {
    console.log(req.uuid)
    try {
      const clientes = await prismaClient.agendaCliente.findMany({
        where: {
          OR: [
            {
              privado: true,
            },
              {
              colaboradorUuid: {
                contains: req.uuid
              }
            }
          ]
        }
      })
  
      return res.status(200).json(clientes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os clientes'
    })
    }
  
  }


  async exibirCliente(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const cliente = await prismaClient.agendaCliente.findUnique({
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
