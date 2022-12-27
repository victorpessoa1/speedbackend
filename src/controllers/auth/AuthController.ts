import { compare, } from 'bcryptjs';
import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

  export class AuthColaboradorController {
    async handle(req: Request, res: Response) {
      const {email, senha} = req.body

      const colaborador = await prismaClient.colaborador.findUnique({
        where: 
          {
            
          }
      })

      
      
    

    return res.json()
  }
}