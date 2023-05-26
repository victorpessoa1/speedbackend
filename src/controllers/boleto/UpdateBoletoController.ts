import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateBoletoController {

  async update(req: Request, res: Response) {
    const {parcela, valor, vencimento, contrato_id, financeira_id, dataPagamento, isPago, obs} = req.body
    const {boleto_id} = req.params

    try {
      const boletoAtualizado = await prismaClient.boleto.update(
            {
              where: { boleto_id: Number(boleto_id) },
              data: { 
                parcela,
                valor,
                vencimento,
                contrato_id,
                financeira_id,
                dataPagamento,
                isPago,
                obs
              }
            }
          )
          return res.status(200).json(boletoAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar boleto" 
      })
    }
  }
}