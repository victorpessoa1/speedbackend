import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadFinanceiraController {
  
  async exibirFinanceiras(req: Request, res: Response) {

    try {
      const financeiras = await prismaClient.financeira.findMany({
        include: {
          Contrato: true
        }
      })
  
      return res.status(200).json(financeiras)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todas as financeiras'
    })
    }
  
  }

  async exibirFinanceira(req: Request, res: Response) {
    const {uuid} = req.params

    try {
      const financeiras = await prismaClient.financeira.findUnique({
        where: {
          financeira_id: Number(uuid)
        },
        include: {
          Contrato: true
        }
      })
  
      return res.status(200).json(financeiras)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todas as financeiras'
    })
    }
  
  }
}