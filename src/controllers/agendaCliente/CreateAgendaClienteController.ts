import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateAgendaClienteController {
 
  async handle(req: Request, res: Response) {


    try{

      const { note, startTime, endTime, subject, prioridade, privado, isAllDay} = req.body

      const agendaCliente = await prismaClient.agendaCliente.create({
        data: {
          criado_por: req.uuid,
          note,
          startTime,
          endTime,
          conclusao: false,
          subject,
          prioridade,
          privado,
          isAllDay
        },
      })
      
    
      return res.status(201).json({agendaCliente, message: "Cliente adicionado à agenda com sucesso"})
    }catch (error) {
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar agenda"
       })
     }
  
  }
}