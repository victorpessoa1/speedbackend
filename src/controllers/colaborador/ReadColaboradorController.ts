import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { transformDocument } from '@prisma/client/runtime';

export class ReadColaboradorController {

  async colaboradores(req: Request, res: Response) {

    try {

      const colaboradores = await prismaClient.colaborador.findMany({
        select: {
          uuid: true,
          nomeCompleto: true,
          cpf: true,
          isAtivo: true,
          login: {
            select: {
              acesso: true,
              autorizado: true,
              email: true,
            }
          },
          EnderecoColaborador: {
            select: {
              bairro: true,
              cep: true,
              cidade: true,
              endereco: true,
              estado: true,
              pais: true,
              rua: true
            }
          },
          DPessoaisColaborador: {
            select: {
              dataEmissao: true,
              localemissao: true,
              eCivel: true,
              nascimento: true,
              oExpedidor: true,
              rg: true,
              sexo: true,
              id_botconversa: true
            }
          },
          Funcao: {
            select: {
              descricao: true,
              uuid: true,
            }
          },
          Equipe: {
            select: {
              idEquipe: true,
              lider: true,
              vendedor: true,
            }
          }
        }
      })

      return res.status(200).json(colaboradores)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao procurar colaboradores'
      })
    }
  }
  async colaboradoresCotas(req: Request, res: Response) {
    const { inicioPesquisa, fimPesquisa } = req.body
    const ip =new Date(inicioPesquisa)
    const fp = new Date(fimPesquisa)
    try {
      const colaboradores = await prismaClient.colaborador.findMany({
        where: {
          isAtivo: true,
        },
        select: {
          uuid: true,
          nomeCompleto: true,
          cpf: true,
          isAtivo: true,
          CotaContrato: {
            where: {
              dataPagamento: {
                gte: ip,
                lte: fp,
              }
            },
            select: {
              ValorContrato: true,
              porcentagemComissao: true,
              dataPagamento: true,
              Contrato: {
                select: {
                  cliente:{
                    select:{
                      nomeCompleto:true,
                      cpf:true,
                    }
                  },
                  financeira:{
                    select:{
                      razaoSocial:true,
                    }
                  },
                  tipoConsorcio_descricao:true,
                  valorBem: true,
                  grupo: true,
                  cota: true,
                }
              }
            },
          },
          CotaBoleto: {
            where: {
              dataPagamento: {
                gte: ip,
                lte: fp,
              }
            },
            select: {
              ValorBoleto: true,
              dataPagamento: true,
              Contrato: {
                select: {
                  cliente:{
                    select:{
                      nomeCompleto:true,
                      cpf:true,
                    }
                  },
                  financeira:{
                    select:{
                      razaoSocial:true,
                    }
                  },
                  tipoConsorcio_descricao:true,
                  valorBem: true,
                  grupo: true,
                  cota: true,
                }
              },
              boleto: {
                select: {
                  dataPagamento: true,
                  valor: true,
                  parcela: true,
                }
              },
              
            }
            
          },
          DPessoaisColaborador: {
            select: {
              rg: true,
              sexo: true,
            }
          },
          Funcao: {
            select: {
              descricao: true,
              uuid: true,
            }
          },
          Equipe: {
            select: {
              idEquipe: true,
              lider: true,
              vendedor: true,
            }
          }
        }
      })

      return res.status(200).json(colaboradores)

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: error,
        message: 'Erro ao procurar colaboradores'
      })
    }
  }
  async colaboradoresAtivos(req: Request, res: Response) {

    try {

      const colaboradores = await prismaClient.colaborador.findMany({
        where: {
          isAtivo: true
        },
        select: {
          uuid: true,
          nomeCompleto: true,
          cpf: true,
          isAtivo: true,
          login: {
            select: {
              acesso: true,
              autorizado: true,
              email: true,
            }
          },
          EnderecoColaborador: {
            select: {
              bairro: true,
              cep: true,
              cidade: true,
              endereco: true,
              estado: true,
              pais: true,
              rua: true
            }
          },
          DPessoaisColaborador: {
            select: {
              dataEmissao: true,
              localemissao: true,
              eCivel: true,
              nascimento: true,
              oExpedidor: true,
              rg: true,
              sexo: true,
              id_botconversa: true
            }
          },
          Funcao: {
            select: {
              descricao: true,
              uuid: true,
            }
          },
          Equipe: {
            select: {
              idEquipe: true,
              lider: true,
              vendedor: true,
            }
          }
        }
      })

      return res.status(200).json(colaboradores)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao procurar colaboradores'
      })
    }
  }

  async colaboradoresInativos(req: Request, res: Response) {

    try {

      const colaboradores = await prismaClient.colaborador.findMany({
        where: {
          isAtivo: false
        },
        select: {
          uuid: true,
          nomeCompleto: true,
          cpf: true,
          isAtivo: true,
          login: {
            select: {
              acesso: true,
              autorizado: true,
              email: true,
            }
          },
          EnderecoColaborador: {
            select: {
              bairro: true,
              cep: true,
              cidade: true,
              endereco: true,
              estado: true,
              pais: true,
              rua: true
            }
          },
          DPessoaisColaborador: {
            select: {
              dataEmissao: true,
              localemissao: true,
              eCivel: true,
              nascimento: true,
              oExpedidor: true,
              rg: true,
              sexo: true,
              id_botconversa: true
            }
          },
          Funcao: {
            select: {
              descricao: true,
              uuid: true,
            }
          },
          Equipe: {
            select: {
              idEquipe: true,
              lider: true,
              vendedor: true,
            }
          }
        }
      })

      return res.status(200).json(colaboradores)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao procurar colaboradores'
      })
    }
  }


  async colaborador(req: Request, res: Response) {
    const { uuid } = req.params
    try {
      const colaborador = await prismaClient.colaborador.findUnique({
        where: {
          uuid
        },
        select: {
          uuid: true,
          nomeCompleto: true,
          cpf: true,
          isAtivo: true,
          login: {
            select: {
              acesso: true,
              autorizado: true,
              email: true,
            }
          },
          EnderecoColaborador: {
            select: {
              bairro: true,
              cep: true,
              cidade: true,
              endereco: true,
              estado: true,
              pais: true,
              rua: true
            }
          },
          DPessoaisColaborador: {
            select: {
              dataEmissao: true,
              localemissao: true,
              eCivel: true,
              nascimento: true,
              oExpedidor: true,
              rg: true,
              sexo: true,
              id_botconversa: true
            }
          },
          Funcao: {
            select: {
              descricao: true,
              uuid: true,
            }
          },
          Equipe: {
            select: {
              idEquipe: true,
              lider: true,
              vendedor: true,
            }
          }
        }
      })

      if (colaborador == null) {
        return res.status(404).json({ message: "Colaborador não encontrado" })
      }

      return res.status(200).json(colaborador)

    } catch (error) {
      return res.status(400).json({
        error: error,
        message: 'Colaborador não encontrado'
      })
    }
  }
}
