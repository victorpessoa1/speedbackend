import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateAgendaClienteController {
 
  async handle(req: Request, res: Response) {

    const {colaborador_uuid} = req.params
    try {
      const {
            cliente, numero, interesse
          } = req.body

      const agendaCliente = await prismaClient.agendaCliente.create({
        data: {
          cliente,
          interesse,
          numero,
          colaborador_uuid
        },
      })
      
    
      return res.status(201).json({agendaCliente, message: "Cliente criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar cliente"
      })
    }
  
  }
}