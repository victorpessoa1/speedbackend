import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateAgendaClienteController {

  async update(req: Request, res: Response) {
    const {  cliente, telefone, whatsapp, dataParaLigar, horaParaLigar } = req.body
    const {uuid} = req.params

    try {
      const clienteAtualizado = await prismaClient.agendaCliente.update(
            {
              where: { uuid },
              data: { 
                cliente,
                telefone,
                whatsapp,
                dataParaLigar,
                horaParaLigar,
              }
            }
          )
          return res.status(200).json(clienteAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar cliente" 
      })
    }
  }
}