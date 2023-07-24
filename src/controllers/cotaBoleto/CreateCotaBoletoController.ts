import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateCotaBoletoController {
 
  async handle(req: Request, res: Response) {


    try{

      const { dataPagamento, porcentagemComissao, ValorBoleto, boleto_id, colaborador_uuid} = req.body
      var { colaboradorUuid } = req.body
      if (!colaboradorUuid) {
        colaboradorUuid = req.uuid
      }
      const cotaBoleto = await prismaClient.cotaBoleto.create({
        data: {
          dataPagamento,
          porcentagemComissao,
          ValorBoleto,
          boleto_id,
          colaborador_uuid
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