import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadEquipeController {
  
  async equipes(req: Request, res: Response) {
  
    try {

      const equipes = await prismaClient.equipe.findMany()
  
      return res.status(200).json(equipes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao procurar equipes'
      })
    }
  }
}
