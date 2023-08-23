import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
import path from 'path'
const fs = require('fs-extra')
var fotoDocumento = ''

export class UpdateClienteController {

  async updateCliente(req: Request, res: Response) {


    try {
    const {nomeCompleto, cpf, isAtivo, dataEmissao, localemissao, eCivel, nascimento, oExpedidor, rg, sexo,
      profissao, rendimento, email, celular, whatsapp, bairro, cep, cidade, endereco, estado, pais, rua,colaborador_uuid} = req.body  
    const {uuid} = req.params    

      try {
        var cliente = await prismaClient.cliente.findUnique({
          where: {
            uuid
          }
        })

      } catch (error) {
        return res.status(500).json({
          error: error,
          message: 'Cliente não encontrado'
        })
      }

      fotoDocumento = path.join(__dirname, '..', 'uploads', cliente!.nomeCompleto.replaceAll(' ', ''))
      console.log(fotoDocumento);

      const clienteAtualizado = await prismaClient.cliente.update(
            {
              where: { uuid, },
              data: { 
                nomeCompleto,
                cpf,
                isAtivo,
                colaborador_uuid,
                DPessoaisCliente:{
                  update: {
                    where: { cliente_uuid: uuid, },
                    data: {
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
                      whatsapp,
                    },
                  },
                },
                EnderecoCliente: {
                  update:{
                    where: {cliente_uuid: uuid},
                    data:{
                        bairro,
                        cep,
                        cidade,
                        endereco,
                        estado,
                        pais,
                        rua,
                    },
                  },
                },
              },
            }
          )
          return res.status(200).json(clienteAtualizado)

    } catch (error) {
      fs.remove(fotoDocumento, (err: any) => {
        if (err) return console.error(err, "erro ao deletar documento")
        console.log('documento deletado com sucesso')
      })
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar cliente" 
      })
    }
  }
}
