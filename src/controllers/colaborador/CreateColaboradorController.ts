import { hash } from 'bcryptjs';
import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateColaboradorController {
  async handle(req: Request, res: Response) {
    
    try {

      const {nomeCompleto, cpf, isAtivo, email, senha, acesso, cep, pais, estado, cidade, bairro,  rua, endereco, dataEmissao,
        localemissao, eCivel, nascimento, oExpedidor, rg, sexo, id_botconversa} = req.body
      const hash_senha = await hash(senha, 12)
      
      const colaborador = await prismaClient.colaborador.create({
      data: {
        nomeCompleto,
        cpf,
        isAtivo,
        login: {
          create: {
            email,
            senha: hash_senha,
            acesso,
            autorizado: false
          }
        },
        EnderecoColaborador: {
          create: {
            cep,
            pais,
            estado,
            cidade,
            bairro, 
            rua,
            endereco
          }
        },
        DPessoaisColaborador: {
          create: {
            dataEmissao,
            localemissao,
            eCivel,
            nascimento,
            oExpedidor,
            rg,
            sexo,
            id_botconversa
          }
        }
      }
    })
    return res.status(201).json(colaborador)
    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Erro ao criar um colaborador'
      })
    }
  }
}