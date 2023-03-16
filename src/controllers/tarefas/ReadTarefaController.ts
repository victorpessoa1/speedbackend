import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadTarefaController {
  
  async exibirTarefas(req: Request, res: Response) {

    try {
      const clientes = await prismaClient.tarefas.findMany()
  
      return res.status(200).json(clientes)

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
