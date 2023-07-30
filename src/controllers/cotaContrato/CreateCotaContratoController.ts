import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateCotaContratoController {
 
  async handle(req: Request, res: Response) {


    try{

      const { dataPagamento, porcentagemComissao, ValorContrato, colaborador_uuid, contrato_id} = req.body

      const cotaContrato = await prismaClient.cotaContrato.createMany({
        data: {
          dataPagamento,
          porcentagemComissao,
          ValorContrato,
          colaborador_uuid,
          contrato_id
        },
      })
      
    
      return res.status(201).json({cotaContrato, message: "CotaContrato criado com sucesso"})
    }catch (error) {
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar CotaContrato"
       })
     }
  
  }
}