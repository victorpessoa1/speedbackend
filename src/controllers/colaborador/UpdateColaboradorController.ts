import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateColaboradorController {

  async update(req: Request, res: Response) {
    const {nomeCompleto, cpf, isAtivo} = req.body
    const {uuid} = req.params

    try {

      const colaboradorAtualizado = await prismaClient.colaborador.update(
      {
        where: { uuid },
        data: { 
          nomeCompleto,
          cpf,
          isAtivo  
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