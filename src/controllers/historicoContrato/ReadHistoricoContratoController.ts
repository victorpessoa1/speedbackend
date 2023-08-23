import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadHistoricoContratoController {
  
  async exibirHistoricoContratos(req: Request, res: Response) {

    try {
      const clientes = await prismaClient.historicoContrato.findMany({
        include:{
          contrato: true,
          Boleto: true
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


  async exibirHistoricoContrato(req: Request, res: Response) {
    const {id} = req.params
    try {
      const cliente = await prismaClient.historicoContrato.findUnique({
        where: {
          id: Number(id),
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'HistoricoContrato não encontrado'
    })
    }
    
  }
}
