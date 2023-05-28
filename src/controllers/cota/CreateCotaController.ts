import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateCotaController {
 
  async handle(req: Request, res: Response) {

    try {
      const {cota, grupo_uuid} = req.body

      const grupoCriado = await prismaClient.cota.create({
        data: {
            cota,
            grupo_uuid
        }
      })
      
    
      return res.status(201).json({grupoCriado, message: "cota criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um cota"
      })
    }
  
  }
}