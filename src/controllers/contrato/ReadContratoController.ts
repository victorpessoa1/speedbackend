import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadContratoController {
  
  async exibirContrato(req: Request, res: Response) {

    try {
      const contratos = await prismaClient.contrato.findMany()
  
      return res.status(200).json(contratos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os contratos'
    })
    }
  
  }
}