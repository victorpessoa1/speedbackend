import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateContemplacaoController {

  async update(req: Request, res: Response) {
    const {tipoContemplacao, data, lance, nContrato} = req.body
    const {contemplacao_id} = req.params

    try {
      const contemplacaoAtualizada = await prismaClient.contemplacao.update(
            {
              where: { contemplacao_id : Number(contemplacao_id) },
              data: { 
                tipoContemplacao,
            data,
            lance,
            nContrato
              }
            }
          )
          return res.status(200).json(contemplacaoAtualizada)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar contemplação" 
      })
    }
  }
}