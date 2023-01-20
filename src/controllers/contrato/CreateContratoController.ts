import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateContratoController {
 
  async handle(req: Request, res: Response) {

    try {
      const {nContrato, planoNovo, valorBem, vencimento, cliente_uuid, colaborador_uuid, tipoConsorcio_id} = req.body

      const contrato = await prismaClient.contrato.create({
        data: {
            nContrato,
            isAtivo: true,
            planoNovo,
            valorBem,
            vencimento,
            cliente_uuid,
            colaborador_uuid,
            tipoConsorcio_id
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