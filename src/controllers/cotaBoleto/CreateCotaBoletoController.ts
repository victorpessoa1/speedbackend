import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateCotaBoletoController {
 
  async criarvarios(req: Request, res: Response) {


    try{
      const {listaComissoes} = req.body
      const cotaBoleto = await prismaClient.cotaBoleto.createMany({
        data: listaComissoes,
      })
      return res.status(201).json({cotaBoleto, message: "cotaBoleto criado com sucesso"})
    }catch (error) {
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar cotaBoleto"
       })
     }
  
  }
  async handle(req: Request, res: Response) {


    try{

      const { dataPagamento, porcentagemComissao, ValorBoleto, boleto_id, colaborador_uuid,contrato_id} = req.body
      const dp = new Date(dataPagamento)
      var { colaboradorUuid } = req.body
      if (!colaboradorUuid) {
        colaboradorUuid = req.uuid
      }
      const cotaBoleto = await prismaClient.cotaBoleto.create({
        data: {
          dataPagamento:dp,
          porcentagemComissao,
          ValorBoleto,
          boleto_id,
          colaborador_uuid,
          contrato_id,
        },
      })
      
    
      return res.status(201).json({cotaBoleto, message: "cotaBoleto criado com sucesso"})
    }catch (error) {
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar cotaBoleto"
       })
     }
  
  }
}