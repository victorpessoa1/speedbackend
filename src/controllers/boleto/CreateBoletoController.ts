import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateBoletoController {

  async criarvariosboletos(req: Request, res: Response) {

    try {
      const { listaBoletos, contrato_id, dataCriado } = req.body

      //   await prismaClient.contrato.update({
      //   where: { id: Number(contrato_id)},
      //   data: {
      //     dataCriado
      //   } 
      // })


      const boletos = await prismaClient.boleto.createMany({
        data: listaBoletos
      })

      return res.status(201).json({ boletos, message: "boletos criados com sucesso" })

    } catch (error) {
      console.log(error)
      return res.status(500).json(
        {
          error: error,
          message: "Falha ao criar Boletos"
        })
    }
  }

  async handle(req: Request, res: Response) {

    try {
      const { parcela, valor, vencimento, contrato_id, financeira_id, obs, isPago } = req.body

      const boleto = await prismaClient.boleto.create({
        data: {
          parcela,
          valor,
          vencimento,
          contrato_id,
          financeira_id,
          obs,
          isPago,
        }
      })


      return res.status(201).json({ boleto, message: "boleto criado com sucesso" })

    } catch (error) {
      return res.status(500).json(
        {
          error: error,
          message: "Falha ao criar um boleto"
        })
    }

  }
}