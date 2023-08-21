import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateHistoricoContratoController {
 
  async handle(req: Request, res: Response) {

    const {colaborador_uuid} = req.params
    try {
      const {
        contrato_id, movimentacao, planoNovo, valorBem, diaVencimento, cliente_uuid, assinatura_cliente,statusContrato_descricao, assinatura_colaborador, assinatura_testemunha_a, assinatura_testemunha_b, financeira_id, banco, conta, tipoConta, agencia, tipoConsorcio_descricao, pParcela, nParcelas, obs, long, lat, grupo, cota   } = req.body

      const historicoContrato = await prismaClient.historicoContrato.create({
        data: {
          isAtivo: true,
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
          banco,
          conta,
          tipoConta,
          agencia,
          tipoConsorcio_descricao,
          statusContrato_descricao,
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
        },

      })
      
    
      return res.status(201).json({historicoContrato, message: "Historico da tarefa criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar historico de tarefa"
      })
    }
  
  }
}