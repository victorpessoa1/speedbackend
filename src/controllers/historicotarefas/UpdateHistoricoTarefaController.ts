import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateHistoricoTarefaController {

  async update(req: Request, res: Response) {

    const {  nometarefa, nomecliente, telefonecliente, horapraligar, statustarefa, dataentrega, obs, aceito, atualizado_por, colaborador_uuid, movimentacao, tarefas } = req.body
    const {uuid} = req.params

    try {
      const historicotarefaAtualizada = await prismaClient.historicoTarefas.update(
            {

              where: { uuid },
              
              data: { 
                nometarefa,
                nomecliente,
                telefonecliente,
                horapraligar,
                statustarefa,
                dataentrega,
                obs,
                aceito,
                colaborador_uuid,
                atualizado_por,
                movimentacao
              }
            }
          )
          return res.status(200).json(historicotarefaAtualizada)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar historico tarefa" 
      })
    }
  }
}