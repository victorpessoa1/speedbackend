import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateFuncaoColaboradorController {

  async update(req: Request, res: Response) {
    const {descricao} = req.body
    const {uuid} = req.params

    try {
      const funcaoColaboradorAtualizado = await prismaClient.funcao.update(
            {
              where: { uuid },
              data: { 
                descricao
              }
            }
          )
          return res.status(200).json(funcaoColaboradorAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar funcaoColaborador" 
      })
    }
  }
}