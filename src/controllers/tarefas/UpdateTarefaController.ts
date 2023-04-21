import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateTarefaController {

  async update(req: Request, res: Response) {









    const {  nometarefa, nomecliente, nomecolaborador, telefonecliente, statustarefa, dataentrega, obs, aceito } = req.body
    const {uuid} = req.params

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