import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadCotaBoletoController {
  
  async exibirCotaBoletoGlobal(req: Request, res: Response) {

    try {
      const cotaBoleto = await prismaClient.cotaBoleto.findMany()
  
      return res.status(200).json(cotaBoleto)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todas as CotaBoleto'
    })
    }
  
  }

  async exibirCotaBoletoDoColaborador(req: Request, res: Response) {
    console.log(req.uuid)
    try {
      const cotaBoletos = await prismaClient.cotaBoleto.findMany({
        where: {
          colaborador_uuid:{
            contains: req.uuid
          }
        }
      })

  
      return res.status(200).json(cotaBoletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar as cotasBoletos'
    })
    }
  
  }

  async exibirCotaBoletoPorTempo(req: Request, res: Response) {

    var { datainicio, datafim } = req.body

    if (!datainicio)
      datainicio = "2022-05-03T23:00:34.431Z"

    if (!datafim)
      datafim = Date.now()

    try {
      const cotaBoleto = await prismaClient.cotaBoleto.findMany({
        where: {
          dataPagamento: {
            gte: datainicio,
            lte: datafim
          }
        }
      })

      return res.status(200).json(cotaBoleto)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'CotaBoleto não encontrado'
    })
    } 
  }



  async exibirCotaBoleto(req: Request, res: Response) {
    const {uuid} = req.params
    try {
      const cotaBoleto = await prismaClient.cotaBoleto.findUnique({
        where: {
          uuid
        }
      })
    
    return res.status(200).json(cotaBoleto)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'CotaBoleto não encontrado'
    })
    }
    
  }
}
