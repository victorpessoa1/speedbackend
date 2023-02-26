import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateEquipeController {
  async handle(req: Request, res: Response) { 


      const {lider, vendedor} = req.body
      
      const equipe = await prismaClient.equipe.create({
        data: {
          lider,
          vendedor
          }
        })
        return res.status(201).json(equipe)
      
  }
}