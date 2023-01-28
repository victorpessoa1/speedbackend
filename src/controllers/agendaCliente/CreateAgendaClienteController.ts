import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateAgendaClienteController {
 
  async handle(req: Request, res: Response) {

    const {colaborador_uuid} = req.params
    try {
      const {  cliente, telefone, whatsapp, dataParaLigar, horaParaLigar } = req.body

      const agendaCliente = await prismaClient.agendaCliente.create({
        data: {
          cliente,
          telefone,
          whatsapp,
          dataParaLigar,
          horaParaLigar,
          colaborador_uuid,
        },
      })
      
    
      return res.status(201).json({agendaCliente, message: "Cliente adicionado à agenda com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar cliente"
      })
    }
  
  }
}