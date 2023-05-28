import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateGrupoController {
 
  async handle(req: Request, res: Response) {

    try {
      const {grupo, financeira_id} = req.body

      const grupoCriado = await prismaClient.grupo.create({
        data: {
            grupo,
            financeira_id
        }
      })
      
    
      return res.status(201).json({grupoCriado, message: "grupo criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um grupo"
      })
    }
  
  }
}