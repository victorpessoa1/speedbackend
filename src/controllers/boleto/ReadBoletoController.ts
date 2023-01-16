import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadBoletoController {
  
  async exibirBoleto(req: Request, res: Response) {

    try {
      const boletos = await prismaClient.boleto.findMany()
  
      return res.status(200).json(boletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os boletos'
    })
    }
  
  }
}