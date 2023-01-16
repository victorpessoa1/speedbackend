import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateTipoConsorcioController {
 
  async handle(req: Request, res: Response) {

    try {
      const {descricao} = req.body

      const tipoConsorcio = await prismaClient.tipoConsorcio.create({
        data: {
          descricao
        },
      })
      
    
      return res.status(201).json({tipoConsorcio, message: "tipo de consorcio criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um tipo de consorcio"
      })
    }
  
  }
}