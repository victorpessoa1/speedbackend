import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateTipoConsorcioController {

  async update(req: Request, res: Response) {
    const {descricao} = req.body
    const {id} = req.params


    try {
      const tipoConsorcioAtualizado = await prismaClient.tipoConsorcio.update(
            {
              where: { id: Number(id) },
              data: { 
                descricao: descricao
              }
            }
          )
          return res.status(200).json(tipoConsorcioAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar o tipo de consorcio" 
      })
    }
  }
}