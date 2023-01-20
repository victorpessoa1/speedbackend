import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateContratoController {

  async update(req: Request, res: Response) {
    const {isAtivo, planoNovo, valorBem, vencimento, cliente_uuid, colaborador_uuid, tipoConsorcio_descricao} = req.body
    const {id} = req.params
    

    try {
      const contratoAtualizado = await prismaClient.contrato.update(
            {
              where: { id : Number(id) },
              data: { 
                isAtivo,
                planoNovo,
                valorBem,
                vencimento,
                cliente_uuid,
                colaborador_uuid,
                tipoConsorcio_descricao
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