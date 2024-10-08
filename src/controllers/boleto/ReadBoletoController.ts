import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadBoletoController {
  
  async exibirBoletos(req: Request, res: Response) {

    try {
      const boletos = await prismaClient.boleto.findMany({
        where:{
          Contrato:{
            statusContrato_descricao:{
              not: 'Cancelado'
            }
          }
        },
        include:{
          Contrato: {
            include: {
              cliente: true,
              colaborador: true
            }
          },
          Financeira: {
            include: {
              Grupo: {
                include: {
                  Cota: true
                }
              }
            }
          },
        }
      })
  
      return res.status(200).json(boletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os boletos'
    })
    }
  
  }

  async exibirBoletosAbertosDeUmColaborador(req: Request, res: Response) {

    try {
      const colaborador_uuid = req.params
      const boletos = await prismaClient.boleto.findMany({
        where: {
          AND: {
            isPago: false,
            Contrato: {
              colaborador_uuid
            } 
          },

          }, 
        include:{
          Contrato: {
            include: {
              cliente: true,
              colaborador: true
            }
          },
          Financeira: {
            include: {
              Grupo: {
                include: {
                  Cota: true
                }
              }
            }
          },
        }
      })
  
      return res.status(200).json(boletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os boletos'
    })
    }
  
  }

  async exibirBoletosAbertosDeUmCliente(req: Request, res: Response) {

    try {
      const cliente_uuid = req.params
      const boletos = await prismaClient.boleto.findMany({
        where: {
          AND: {
            isPago: false,
            Contrato: {
              cliente_uuid
            } 
          },

          }, 
        include:{
          Contrato: {
            include: {
              cliente: true,
              colaborador: true
            }
          },
          Financeira: {
            include: {
              Grupo: {
                include: {
                  Cota: true
                }
              }
            }
          },
        }
      })
  
      return res.status(200).json(boletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os boletos'
    })
    }
  
  }

  async exibirBoletosfechados(req: Request, res: Response) {

    try {
      const boletos = await prismaClient.boleto.findMany({
        where: {
          isPago: true,
        }, 
        include:{
          Contrato: {
            include: {
              cliente: true,
              colaborador: true
            }
          },
          Financeira: {
            include: {
              Grupo: {
                include: {
                  Cota: true
                }
              }
            }
          },
        }
      })
  
      return res.status(200).json(boletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os boletos'
    })
    }
  
  }


  async exibirBoletosfechadosPorDataEColabordor(req: Request, res: Response) {

    try {
      const {dataInicio, dataFim, colaborador_uuid} = req.body
console.log(colaborador_uuid)
      const boletos = await prismaClient.boleto.findMany({
        where: {
          isPago: true,
          parcela:{
            lte:4
          },
          dataPagamento:{
            contains: dataInicio,
            
          },
          Contrato:{
            colaborador_uuid: colaborador_uuid
          }
          
        }, 
        include:{
          Contrato: {
            include: {
              cliente: true,
              colaborador: true
            }
          },
          Financeira: {
            include: {
              Grupo: {
                include: {
                  Cota: true
                }
              }
            }
          },
        }
      })
  
      return res.status(200).json(boletos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os boletos'
    })
    }
  
  }
}