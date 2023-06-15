import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateColaboradorController {

  async update(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo, nascimento, sexo, rg, oExpedidor, dataEmissao, eCivel, id_botconversa,
      cep, pais, estado, cidade, bairro, rua, endereco, acesso, autorizado, funcaoUuid } = req.body
    const {uuid} = req.params

    try {
      const colaboradorAtualizado = await prismaClient.colaborador.update(
      {
        where: { uuid },
        data: { 
          nomeCompleto,
          cpf,
          isAtivo,
          funcaoUuid,
          DPessoaisColaborador: {
            update: {
              where: { colaborador_uuid: uuid },
              data: {
                dataEmissao,
                eCivel,
                id_botconversa,
                nascimento,
                oExpedidor,
                rg,
                sexo
              },
            },
          },
          EnderecoColaborador: {
            update: {
              where: { colaborador_uuid: uuid },
              data: {
                bairro,
                cep,
                cidade,
                endereco,
                estado,
                pais,
                rua
              },
            },
          },
          login: {
            update: {
              where: { colaborador_uuid: uuid },
              data: {
                acesso,
                autorizado
              },
            },
          },
        }
      }
      )
      return res.status(200).json(colaboradorAtualizado)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao atualizar colaborador'
      })
    } 
  }

  async updateEnderecoColaborador(req: Request, res: Response) {
    const { cep, pais, estado, cidade, bairro, rua, endereco} = req.body
    const {colaborador_uuid} = req.params

    try {

      const colaboradorAtualizado = await prismaClient.enderecoColaborador.update(
      {
        where: { colaborador_uuid },
        data: { 
          cep,
          pais,
          estado,
          cidade,
          bairro,
          rua,
          endereco
        }
      }
      )

      return res.status(200).json(colaboradorAtualizado)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao atualizar endereco do colaborador'
      })
    } 
  }

  async updateDPessoaisColaborador(req: Request, res: Response) {
    const {nascimento, sexo, rg, oExpedidor, dataEmissao, eCivel, id_botconversa} = req.body
    const {colaborador_uuid} = req.params

    try {

      const colaboradorAtualizado = await prismaClient.dPessoaisColaborador.update(
      {
        where: { colaborador_uuid },
        data: { 
          nascimento,
          sexo,
          rg,
          oExpedidor,
          dataEmissao,
          eCivel,
          id_botconversa
        }
      }
      )

      return res.status(200).json(colaboradorAtualizado)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao atualizar dados pessoais do colaborador'
      })
    } 
  }
}