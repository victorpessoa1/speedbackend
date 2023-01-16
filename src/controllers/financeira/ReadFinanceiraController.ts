import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadFinanceiraController {
  
  async exibirFinanceira(req: Request, res: Response) {

    try {
      const financeiras = await prismaClient.financeira.findMany()
  
      return res.status(200).json(financeiras)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todas as financeiras'
    })
    }
  
  }
}