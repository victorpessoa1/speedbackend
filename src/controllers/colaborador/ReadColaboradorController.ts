import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadColaboradorController {
  
  async colaboradores(req: Request, res: Response) {
  
    try {

      const colaboradores = await prismaClient.colaborador.findMany()
  
      return res.status(200).json(colaboradores)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao procurar colaboradores'
    })
  }
}


  async colaborador(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const colaborador = await prismaClient.colaborador.findUnique({
        where: {
          uuid
        }
      })
    
      if (colaborador == null) {
        return res.status(404).json({message: "Colaborador não encontrado"})
      }

    return res.status(200).json(colaborador)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Colaborador não encontrado'
      })
    } 
  }
}
