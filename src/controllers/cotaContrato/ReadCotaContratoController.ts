import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadCotaContratoController {
  
  async exibirCotaContratoGlobal(req: Request, res: Response) {

    try {
      const cotaContrato = await prismaClient.cotaContrato.findMany()
  
      return res.status(200).json(cotaContrato)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os cotaContrato'
    })
    }
  
  }

  async exibirCotaContratoDoColaborador(req: Request, res: Response) {
    console.log(req.uuid)
    try {
      const cotaContrato = await prismaClient.cotaContrato.findMany({
        where: 
          {
            colaborador_uuid: 
            {
            contains: req.uuid
            }
          }  
      })
  
      return res.status(200).json(cotaContrato)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os cotaContrato'
    })
    }
  
  }


  async exibirCotaContrato(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const cotaContrato = await prismaClient.cotaContrato.findUnique({
        where: {
          uuid
        }
      })
    
    return res.status(200).json(cotaContrato)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'CotaContrato não encontrado'
    })
    }
    
  }
}
