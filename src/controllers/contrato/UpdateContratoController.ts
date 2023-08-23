import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateContratoController {

  async update(req: Request, res: Response) {
    
    const {id} = req.params
    if (!id) {
      return res.status(404).json({message:"id inexistente"})
    }
    const contratoantigo = await prismaClient.contrato.findUnique({
      where: {id: Number(id)}
    })

    if(!contratoantigo)
    {
      return res.status(404).json({
        message: "Contrato inexistente"
      })
    }

    const {movimentacao} = req.body

    // try{
    //   const historicocontrato = await prismaClient.historicoContrato.upsert({
    //     // where: {id: Number(id)}
    //   })
    // }


    const { isAtivo, planoNovo, valorBem, diaVencimento, cliente_uuid, colaborador_uuid, statusContrato_descricao,
            assinatura_cliente, assinatura_colaborador, assinatura_testemunha_a, assinatura_testemunha_b,
            financeira_id, tipoConsorcio_descricao, pParcela, nParcelas, obs, long, lat, banco, conta, tipoConta, agencia, grupo, cota} = req.body

    

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
                banco,
                conta,
                tipoConta,
                agencia,
                tipoConsorcio_descricao,
                statusContrato_descricao,
                obs,
                pParcela,
                nParcelas,
                long,
                lat,
                grupo,
                cota
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