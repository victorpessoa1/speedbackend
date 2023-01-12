import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateClienteController {
 
  async handle(req: Request, res: Response) {

    const colaborador_uuid = req.uuid
    try {
      const {
            nomeCompleto, cpf, isAtivo, dataEmissao, eCivel, nascimento, oExpedidor, rg, sexo,
            email, telefone, bairro, cep, cidade, endereco, estado, pais, rua
          } = req.body

      const cliente = await prismaClient.cliente.create({
        data: {
          nomeCompleto,
          cpf,
          isAtivo,
          colaborador_uuid,
          DPessoaisCliente: {
            create: {
              dataEmissao,
              eCivel,
              email,
              nascimento,
              oExpedidor,
              rg,
              sexo,
              telefone,
    
            }
          },
          EnderecoCliente: {
            create: {
              bairro,
              cep,
              cidade,
              endereco,
              estado,
              pais,
              rua
            }
          }
        },
      })
      
    
      return res.status(201).json({cliente, message: "Cliente criado com sucesso"})
      
    } catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar cliente"
      })
    }
  
  }
}