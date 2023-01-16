import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadTipoConsorcioController {
  
  async exibirTipoConsorcio(req: Request, res: Response) {

    try {
      const tipoConsorcio = await prismaClient.tipoConsorcio.findMany()
  
      return res.status(200).json(tipoConsorcio)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os tipo de consorcio'
    })
    }
  
  }
}