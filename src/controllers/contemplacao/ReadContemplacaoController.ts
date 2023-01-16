import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadContemplacaoController {
  
  async exibirContemplacao(req: Request, res: Response) {

    try {
      const contemplacoes = await prismaClient.contemplacao.findMany()
  
      return res.status(200).json(contemplacoes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todas as contemplações'
    })
    }
  
  }
}