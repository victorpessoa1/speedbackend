import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateContratoController {
 
  async handle(req: Request, res: Response) {

    try {
      const { planoNovo, valorBem, diaVencimento, cliente_uuid, colaborador_uuid, assinatura_cliente, statusContrato_descricao,
          assinatura_colaborador, assinatura_testemunha_a, assinatura_testemunha_b, financeira_id, 
          tipoConsorcio_descricao, pParcela, nParcelas, obs, long, lat, banco, conta, tipoConta, agencia, grupo, cota} = req.body

      const contrato = await prismaClient.contrato.create({
        data: {
            isAtivo: true,
            planoNovo,
            valorBem,
            diaVencimento,
            cliente_uuid,
            colaborador_uuid,
            statusContrato_descricao,
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
            cota
        }
      })
      
    
      return res.status(201).json({contrato, message: "contrato criado com sucesso"})
      
    } catch (error) {
      console.log(error)
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um contrato"
      })
    }
  
  }
}