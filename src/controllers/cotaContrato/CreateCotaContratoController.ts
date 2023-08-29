import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateCotaContratoController {

  async criarvarios(req: Request, res: Response) {
    try{
      const {listaComissoesContrato} = req.body
     
      const cotaContrato = await prismaClient.cotaContrato.createMany({
        data: listaComissoesContrato,
      })   
      return res.status(201).json({cotaContrato, message: "CotaContrato criado com sucesso"})
    }catch (error) {
      console.log(error)
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar CotaContrato"
       })
     }
  
  }
  async handle(req: Request, res: Response) {


    const { dataPagamento, porcentagemComissao, ValorContrato, colaborador_uuid, contrato_id} = req.body
    try{

      const dp = new Date(dataPagamento)
      const cotaContrato = await prismaClient.cotaContrato.createMany({
        data: {
          dataPagamento:dp,
          porcentagemComissao,
          ValorContrato,
          colaborador_uuid,
          contrato_id
        },
      })
      
    
      return res.status(201).json({cotaContrato, message: "CotaContrato criado com sucesso"})
    }catch (error) {
      console.log(error)
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar CotaContrato"
       })
     }
  
  }
}