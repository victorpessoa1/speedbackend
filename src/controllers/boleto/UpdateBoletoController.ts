import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateBoletoController {

  async update(req: Request, res: Response) {
    const {parcela, valor, vencimento, contrato_id, financeira_id, dataPagamento, isPago, obs} = req.body
    const {boleto_id} = req.params

    try {

      if(isPago) {
        const contrato = await prismaClient.contrato.findFirst({
          where: {
            id: contrato_id
          }
        })
        if(contrato?.colaborador_uuid == null) {
          return res.status(404).json({
            message: "contrato.colaborador_uuid not found"
          })
        }
        
      
        const cotaBoleto = await prismaClient.cotaBoleto.create(
          {
            data: {
              dataPagamento: String(Date.now()),
              porcentagemComissao: 0.01,
              ValorBoleto: valor * 0.01,
              boleto_id: Number(boleto_id),
              colaborador_uuid: contrato.colaborador_uuid,

            }
          }
        )

        console.log(cotaBoleto)//teste ara ver se cria mesmo
             
             
      }


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