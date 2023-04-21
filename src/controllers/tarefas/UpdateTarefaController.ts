import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateTarefaController {

  async update(req: Request, res: Response) {
    const {uuid} = req.params

   
    const tarefaantiga = await prismaClient.tarefas.findUnique({
      where: {uuid}
    })
    
    const {atualizado_por, movimentacao} = req.body

    const historicotarefa = await prismaClient.historicoTarefas.upsert({
      where: {uuid},
        create: {

          tarefa_uuid: String(tarefaantiga?.uuid),
          nometarefa: String(tarefaantiga?.nometarefa),
          nomecliente: String(tarefaantiga?.nomecliente),
          nomecolaborador: String(tarefaantiga?.nomecolaborador),
          telefonecliente: String(tarefaantiga?.telefonecliente),
          statustarefa: String(tarefaantiga?.statustarefa),
          colaborador_uuid: tarefaantiga?.colaborador_uuid,
          dataentrega: tarefaantiga?.dataentrega,
          obs: String(tarefaantiga?.obs),
          aceito: Boolean(tarefaantiga?.aceito),
          atualizado_por,
          movimentacao,

     }

    })





    const {  nometarefa, nomecliente, nomecolaborador, telefonecliente, statustarefa, dataentrega, obs, aceito } = req.body

    try {
      const tarefaAtualizada = await prismaClient.tarefas.update(
            {
              where: { uuid },
              data: { 
                nometarefa,
                nomecliente,
                nomecolaborador,
                telefonecliente,
                statustarefa,
                dataentrega,
                obs,
                aceito
              }
            }
          )
          return res.status(200).json(tarefaAtualizada)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar tarefa" 
      })
    }
  }
}