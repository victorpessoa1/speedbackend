import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateGrupoController {

  async update(req: Request, res: Response) {
    const {financeira_id, grupo} = req.body
    const {uuid} = req.params

    try {
      const grupoAtualizado = await prismaClient.grupo.update(
            {
              where: { uuid },
              data: { 
                financeira_id,
                grupo
              }
            }
          )
          return res.status(200).json(grupoAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar grupo" 
      })
    }
  }
}