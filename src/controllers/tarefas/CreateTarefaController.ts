import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateTarefaController {
 
  async handle(req: Request, res: Response) {

    const {colaborador_uuid} = req.params
    try {
      const {  nometarefa, nomecliente, nomecolaborador, telefonecliente, dataentrega, obs } = req.body

      const tarefa = await prismaClient.tarefas.create({
        data: {
          nometarefa,
          nomecliente,
          nomecolaborador,
          telefonecliente,
          statustarefa: "em espera",
          colaborador_uuid,
          dataentrega,
          obs,
          aceito: false

          
        },

      })
      
    
      return res.status(201).json({tarefa, message: "tarefa adicionado à agenda com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar cliente"
      })
    }
  
  }
}