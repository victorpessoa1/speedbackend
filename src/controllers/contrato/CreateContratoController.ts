import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateContratoController {
 
  async handle(req: Request, res: Response) {

    try {
      const {planoNovo, valorBem, diaVencimento, cliente_uuid, colaborador_uuid, financeira_id, tipoConsorcio_descricao, long, lat} = req.body
      const contrato = await prismaClient.contrato.create({
        data: {
            isAtivo: true,
            planoNovo,
            valorBem,
            diaVencimento,
            cliente_uuid,
            colaborador_uuid,
            financeira_id,
            tipoConsorcio_descricao,
            long,
            lat
            
        }
      })
      
    
      return res.status(201).json({contrato, message: "contrato criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar um contrato"
      })
    }
  
  }
}