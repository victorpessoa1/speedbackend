import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateClienteController {
 
  async handle(req: Request, res: Response) {
    console.log(req.file)

    const colaborador_uuid = req.uuid
    const fotoDocumento = req.file?.path
    try {
      const {
            nomeCompleto, cpf, isAtivo, dataEmissao, eCivel, nascimento, oExpedidor, rg, sexo,
            profissao, rendimento, email, celular, whatsapp, bairro, cep, cidade, endereco, estado, pais, rua
          } = req.body

      const cliente = await prismaClient.cliente.create({
        data: {
          nomeCompleto,
          cpf,
          isAtivo: Boolean(isAtivo),
          colaborador_uuid,
          DPessoaisCliente: {
            create: {
              dataEmissao,
              eCivel,
              email,
              nascimento,
              oExpedidor,
              rg,
              fotoDocumento: String(fotoDocumento),
              sexo,
              profissao,
              rendimento,
              celular,
              whatsapp
    
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
      
    } 
    catch (error) {
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar cliente"
      })
    }
  
  }
}