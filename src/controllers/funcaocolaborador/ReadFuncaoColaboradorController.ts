import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadFuncaoColaboradorController {
  
  async exibirFuncoesColaborador(req: Request, res: Response) {

    try {
      const funcao = await prismaClient.funcao.findMany({
        
      })
  
      return res.status(200).json(funcao)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todas as funcoes'
    })
    }
  
  }

  async exibirFuncaoColaborador(req: Request, res: Response) {
    const {uuid} = req.params

    try {
      const funcao = await prismaClient.funcao.findUnique({
        where: {
          uuid
        }
      })
  
      return res.status(200).json(funcao)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar a função'
    })
    }
  
  }
}