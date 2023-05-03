import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateTarefaController {
 
  async handle(req: Request, res: Response) {

    const {colaborador_uuid} = req.params
    try {
      const {  nometarefa, nomecliente, nomecolaborador, telefonecliente, horapraligar, dataentrega, obs } = req.body

      const tarefa = await prismaClient.tarefas.create({
        data: {
          nometarefa,
          nomecliente,
          telefonecliente,
          horapraligar,
          statustarefa: "em espera",
          colaborador_uuid,
          dataentrega: "em espera",
          obs,
          aceito: false
        },

      })
      
    
      return res.status(201).json({tarefa, message: "tarefa adicionado à agenda com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar tarefa"
      })
    }
  
  }
}