import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateHistoricoContratoController {

  async update(req: Request, res: Response) {

    const { isAtivo, contrato_id, movimentacao, colaborador_uuid, valorBem, diaVencimento, cliente_uuid, assinatura_cliente, assinatura_colaborador, assinatura_testemunha_a, assinatura_testemunha_b, financeira_id, banco, conta, tipoConta, agencia, tipoConsorcio_descricao, pParcela, nParcelas, obs, long, lat, grupo, cota   } = req.body
    const {id} = req.params

    try {
      const historicocontratoAtualizada = await prismaClient.historicoContrato.update(
            {

              where: { id: Number(id) },
              
              data: { 
                isAtivo,
                valorBem,
                diaVencimento,
                cliente_uuid,
                assinatura_cliente,
                assinatura_colaborador,
                assinatura_testemunha_a,
                assinatura_testemunha_b,
                financeira_id,
                banco,
                conta,
                tipoConta,
                agencia,
                tipoConsorcio_descricao,
                pParcela,
                nParcelas,
                obs,
                long,
                lat,
                grupo,
                cota,
                atualizado_por: colaborador_uuid,
                movimentacao,
                contrato_id
              }
            }
          )
          return res.status(200).json(historicocontratoAtualizada)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar historico contrato" 
      })
    }
  }
}