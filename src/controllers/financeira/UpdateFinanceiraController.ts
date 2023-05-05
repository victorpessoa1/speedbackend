import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateFinanceiraController {

  async update(req: Request, res: Response) {
    const {cnpj, email, gerente, razaoSocial} = req.body
    const {financeira_id} = req.params

    try {
      const financeiraAtualizada = await prismaClient.financeira.update(
            {
              where: { financeira_id : Number(financeira_id) },
              data: { 
                cnpj,
                email, 
                gerente, 
                razaoSocial
              }
            }
          )
          return res.status(200).json(financeiraAtualizada)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar financeira" 
      })
    }
  }
}