import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
import path from 'path'
const fs = require('fs-extra')

export class CreateClienteController {
 
  async handle(req: Request, res: Response) {
    
    const colaborador_uuid = req.uuid
    const fotoDocumento = path.join(__dirname, '..', 'uploads', req.body.nomeCompleto.replaceAll(' ', ''))
    console.log(fotoDocumento);
    
    try {
      const {
            nomeCompleto, cpf, isAtivo, dataEmissao, localemissao, eCivel, nascimento, oExpedidor, rg, sexo,
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
              localemissao,
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
      fs.remove(fotoDocumento, (err: any) => {
        if (err) return console.error(err, "erro ao deletar documento")
        console.log('documento deletado com sucesso')
      })
     return res.status(500).json(
      { 
      error: error,
      message: "Falha ao criar cliente"
      })
    }
  
  }
}