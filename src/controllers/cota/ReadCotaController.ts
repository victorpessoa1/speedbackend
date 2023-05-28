import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadCotaController {
  
  async exibirCotas(req: Request, res: Response) {

    try {
      const grupos = await prismaClient.cota.findMany({
        include: {
          grupo: true
        }
      })
  
      return res.status(200).json(grupos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os grupos'
    })
    }
  
  }

  async exibirCota(req: Request, res: Response) {
    const {uuid} = req.params

    try {
      const grupos = await prismaClient.cota.findUnique({
        where: {
          uuid
        },
        include: {
          grupo: true
        }
      })
  
      return res.status(200).json(grupos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os grupos'
    })
    }
  
  }
}