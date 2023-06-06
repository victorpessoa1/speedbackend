import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateFuncaoColaboradorController {
 
  async handle(req: Request, res: Response) {

    try {
      const {descricao} = req.body

      const funcaoColaboradorCriado = await prismaClient.funcao.create({
        data: {
            descricao
        }
      })
      
    
      return res.status(201).json({funcaoColaboradorCriado, message: "funcaoColaborador criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um funcaoColaborador"
      })
    }
  
  }
}