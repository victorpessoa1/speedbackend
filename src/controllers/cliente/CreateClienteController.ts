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
      console.log(error)
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
  async uploadDocumento(req: Request, res: Response){
    const {client_uuid} = req.body
    try{
      const multer = require("multer")
      
      const storage = multer.diskStorage({
          destination: async (req: any, file: any, cb: any) => {
              console.log(req.body)
              console.log("//////////////////////////");
              
           //   const nomeCompleto = req.body.nomeCompleto.replaceAll(' ', '');
              const pasta = path.join(__dirname, '..', 'uploads', client_uuid);
              
              try {
                  await fs.ensureDir(pasta); // Verifica se a pasta existe e cria caso não exista
                  cb(null, pasta);
                } catch (err) {
                  cb(err, null);
                }        
              
          },
          filename: (req: any, file: any, cb: any) => {
              cb(null, file.originalname);
          }
      })
      
      var upload = multer ({ 
          storage: storage,
       })
       return res.status(201).json({message: "Cliente criado com sucesso"}) 
  }catch(error) {
      console.log(
          { 
          error: error,
          message: "Falha ao criar cliente"
          })
          return res.status(500).json({ message: "Documento nao inserido"}) 
  }
  }
}