import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateClienteController {

  async updateCliente(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo, dataEmissao, eCivel, nascimento, oExpedidor, rg, sexo,
      profissao, rendimento, email, celular, whatsapp, bairro, cep, cidade, endereco, estado, pais, rua} = req.body  
    const {uuid} = req.params
    
    const fotoDocumento = req.file?.path
 
    


    try {
      const clienteAtualizado = await prismaClient.cliente.update(
            {
              where: { uuid, },
              data: { 
                nomeCompleto,
                cpf,
                isAtivo,
                DPessoaisCliente:{
                  update: {
                    where: { cliente_uuid: uuid, },
                    data: {
                      dataEmissao: dataEmissao,
                      eCivel: eCivel,
                      email: email,
                      nascimento: nascimento,
                      oExpedidor: oExpedidor,
                      rg: rg,
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
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar cliente" 
      })
    }
  }

  async updateDPessoaisCliente(req: Request, res: Response) {
    const {dataEmissao, eCivel, email, nascimento, oExpedidor, rg, fotoDocumento, sexo, profissao, 
          rendimento, celular, whatsapp, id_botconversa} = req.body
    const {cliente_uuid} = req.params

    try {
      const clienteAtualizado = await prismaClient.dPessoaisCliente.update(
            {
              where: { cliente_uuid },
              data: { 
              dataEmissao,
              eCivel,
              email,
              nascimento,
              oExpedidor,
              rg,
              fotoDocumento,
              sexo,
              profissao,
              rendimento,
              celular,
              whatsapp,
              id_botconversa
              }
            }
          )
          return res.status(200).json(clienteAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar os dados pessoais do cliente" 
      })
    }
  }

  async updateEnderecoCliente(req: Request, res: Response) {
    const {bairro, cep, cidade, endereco, estado, pais, rua} = req.body
    const {cliente_uuid} = req.params

    try {
      const clienteAtualizado = await prismaClient.enderecoCliente.update(
            {
              where: { cliente_uuid },
              data: { 
                bairro,
                cep,
                cidade,
                endereco,
                estado,
                pais,
                rua  
              }
            }
          )
          return res.status(200).json(clienteAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar os dados do endereço do cliente" 
      })
    }
    
  }

  async updateDadosBancariosCliente(req: Request, res: Response) {
    const {agencia, cc, cp} = req.body
    const {cliente_uuid} = req.params

    try {
      const clienteAtualizado = await prismaClient.dadosBancariosCliente.update(
            {
              where: { cliente_uuid },
              data: { 
               agencia,
               cc,
               cp
              }
            }
          )
          return res.status(200).json(clienteAtualizado)

    } catch (error) {
      return res.status(500).json({ 
        error: error, 
        message: "Erro ao atualizar os dados do endereço do cliente" 
      })
    }
    
  }
}
