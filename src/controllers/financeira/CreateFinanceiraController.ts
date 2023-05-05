import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateFinanceiraController {
 
  async handle(req: Request, res: Response) {

    try {
      const {cnpj, email, gerente, razaoSocial} = req.body

      const financeira = await prismaClient.financeira.create({
        data: {
            cnpj,
            email,
            gerente,
            razaoSocial,
        }
      })
      
    
      return res.status(201).json({financeira, message: "financeira criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um financeira"
      })
    }
  
  }
}