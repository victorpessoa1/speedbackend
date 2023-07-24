import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateAgendaClienteController {

  async update(req: Request, res: Response) {
    const {  dataPagamento, porcentagemComissao, ValorBoleto } = req.body
    const {uuid} = req.params

    try {
      const CotaBoletoAtualizado = await prismaClient.cotaBoleto.update(
            {
              where: { uuid },
              data: { 
                dataPagamento,
                porcentagemComissao,
                ValorBoleto
              }
            }
          )
          return res.status(200).json(CotaBoletoAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar CotaBoleto" 
      })
    }
  }
}