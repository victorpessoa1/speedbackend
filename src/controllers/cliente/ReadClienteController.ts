import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadClienteController {
  
  async clientes(req: Request, res: Response) {

    try {
      const clientes = await prismaClient.cliente.findMany({
        where:{
          colaborador_uuid: req.uuid,
          
        },
        select:{
          uuid: true,
          nomeCompleto: true,
          cpf: true,
          isAtivo: true,
          DPessoaisCliente:{
            select:{
              rg: true,
              dataEmissao: true,
              oExpedidor: true,
              eCivel: true,
              sexo: true,
              nascimento: true,
              celular: true,
              whatsapp: true,
              email: true,
            }
          },
          EnderecoCliente:{
            select:{
              cep: true,
              pais: true,
              estado: true,
              cidade: true,
              bairro: true,
              rua: true,
              endereco: true,
            }
          }
        }
      })
  
      return res.status(200).json(clientes)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os clientes'
    })
    }
  
  }


  async cliente(req: Request, res: Response) {
    const {cpf} = req.body
    try {
      const cliente = await prismaClient.cliente.findUnique({
        where: {
          cpf
        }
      })
    
    return res.status(200).json(cliente)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Cliente não encontrado'
    })
    }
    
  }
}
