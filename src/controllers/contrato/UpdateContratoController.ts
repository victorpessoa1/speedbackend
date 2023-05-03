import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateContratoController {

  async update(req: Request, res: Response) {
    const { isAtivo, planoNovo, valorBem, diaVencimento, cliente_uuid, colaborador_uuid, 
            assinatura_cliente, assinatura_colaborador, assinatura_testemunha_a, assinatura_testemunha_b,
            financeira_id, tipoConsorcio_descricao, long, lat} = req.body

    const {id} = req.params
    

    try {
      const contratoAtualizado = await prismaClient.contrato.update(
            {
              where: { id : Number(id) },
              data: { 
                isAtivo,
                planoNovo,
                valorBem,
                diaVencimento,
                cliente_uuid,
                colaborador_uuid,
                assinatura_cliente,
                assinatura_colaborador,
                assinatura_testemunha_a,
                assinatura_testemunha_b,
                financeira_id,
                tipoConsorcio_descricao,
                long,
                lat
              }
            }
          )
          return res.status(200).json(contratoAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar contrato" 
      })
    }
  }
}