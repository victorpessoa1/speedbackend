import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateContemplacaoController {
 
  async handle(req: Request, res: Response) {

    try {
      const {tipoContemplacao, data, lance, id} = req.body

      const contemplacao = await prismaClient.contemplacao.create({
        data: {
            tipoContemplacao,
            data,
            lance,
            id
        }
      })
      
    
      return res.status(201).json({contemplacao, message: "contemplação criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar uma contemplação"
      })
    }
  
  }
}