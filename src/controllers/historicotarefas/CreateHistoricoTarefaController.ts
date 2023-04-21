import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateHistoricoTarefaController {
 
  async handle(req: Request, res: Response) {

    const {colaborador_uuid} = req.params
    try {
      const {  tarefa, nometarefa, nomecliente, nomecolaborador, telefonecliente, dataentrega, obs, atualizado_por, movimentacao } = req.body

      const historicoTarefa = await prismaClient.historicoTarefas.create({
        data: {
          tarefa,
          nometarefa,
          nomecliente,
          nomecolaborador,
          telefonecliente,
          statustarefa: "em espera",
          colaborador_uuid,
          dataentrega,
          obs,
          aceito: false,
          atualizado_por,
          movimentacao,        
        },

      })
      
    
      return res.status(201).json({historicoTarefa, message: "Historico da tarefa criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar historico de tarefa"
      })
    }
  
  }
}