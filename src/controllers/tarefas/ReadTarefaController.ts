import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadTarefaController {
  
  async exibirTarefas(req: Request, res: Response) {

    try {
      const tarefas = await prismaClient.tarefas.findMany({
        include: {
          historicoTarefas: true,
          colaborador: {
            select: {
              nomeCompleto: true,
            }
          }
        }
      })
      
  
      return res.status(200).json(tarefas)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar tarefas'
    })
    }   
  }


  async exibirTarefa(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const cliente = await prismaClient.tarefas.findUnique({
        where: {
          uuid
        },
        include: {
          historicoTarefas: true,
          colaborador: {
            select: {
              nomeCompleto: true,
            }
          }
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Tarefa não encontrado'
    })
    }
    
  }

  async exibirTarefasEmEspera(req: Request, res: Response) {
    try {
      const cliente = await prismaClient.tarefas.findMany({
        where: {
          statustarefa: "em espera"
        },
        include: {
          historicoTarefas: true,
          colaborador: {
            select: {
              nomeCompleto: true,
            }
          }
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Tarefa não encontrado'
    })
    }
  }
  async exibirTarefasConcluidas(req: Request, res: Response) {
    try {
      const cliente = await prismaClient.tarefas.findMany({
        where: {
          statustarefa: "concluida"
        },
        include: {
          historicoTarefas: true,
          colaborador: {
            select: {
              nomeCompleto: true,
            }
          }
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Tarefa não encontrado'
    })
    }
  }
}
