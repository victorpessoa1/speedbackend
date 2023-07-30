import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadHistoricoTarefaController {
  
  async exibirHistoricoTarefas(req: Request, res: Response) {

    try {
      const clientes = await prismaClient.historicoTarefas.findMany({
        include:{
          tarefas: true,
          colaborador: true
        }
      })
  
      return res.status(200).json(clientes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar historicotarefas'
    })
    }
  
  }


  async exibirHistoricoTarefa(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const cliente = await prismaClient.historicoTarefas.findUnique({
        where: {
          uuid
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'HistoricoTarefa não encontrado'
    })
    }
    
  }
}
