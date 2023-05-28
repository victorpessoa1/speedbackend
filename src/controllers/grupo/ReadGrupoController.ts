import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadGrupoController {
  
  async exibirGrupos(req: Request, res: Response) {

    try {
      const grupos = await prismaClient.grupo.findMany({
        include: {
          Cota: true
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

  async exibirGrupo(req: Request, res: Response) {
    const {uuid} = req.params

    try {
      const grupos = await prismaClient.grupo.findUnique({
        where: {
          uuid
        },
        include: {
          Cota: true
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