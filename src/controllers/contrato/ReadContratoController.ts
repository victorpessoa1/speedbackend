import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadContratoController {
  
  async exibirContrato(req: Request, res: Response) {

    try {
      const contratos = await prismaClient.contrato.findMany()
  
      return res.status(200).json(contratos)

    } catch (error) {
      return res.status(500).json({
        error: error,
        message: 'Erro ao listar todos os contratos'
    })
    }
  
  }

  async exibirContratos(req: Request, res: Response) {
        
    const contratos = await prismaClient.contrato.findMany({
        
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosPorColaborador(req: Request, res: Response) {
    const {uuid} = req.params
        
    const contratos = await prismaClient.contrato.findMany({
        where: {colaborador_uuid : uuid},
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosPorCliente(req: Request, res: Response) {
    
    const {cliente_uuid} = req.params
    
    const contratos = await prismaClient.contrato.findMany({
      where: {cliente_uuid},
        
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosPorTempo(req: Request, res: Response) {
    
    const {tempoInicial, tempoFinal} = req.body

    const contratos = await prismaClient.contrato.findMany({
        where: {
            dataCriado: {
                gte: tempoInicial,
                lt: tempoFinal
            },
            isAtivo: true
        },
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,
                }
            },
            Contemplacao: true,            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosAtivos(req: Request, res: Response) {
        
    const contratos = await prismaClient.contrato.findMany({
      where: {isAtivo: true},
        
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosInativos(req: Request, res: Response) {
        
    const contratos = await prismaClient.contrato.findMany({
      where: {isAtivo: false},
        
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosPendentes(req: Request, res: Response) {
        
    const contratos = await prismaClient.contrato.findMany({
      where: {isAtivo: true},
        
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }

  async exibirContratosDeUmCliente(req: Request, res: Response) {
        
    const contratos = await prismaClient.contrato.findMany({
      where: {cliente_uuid: req.params},
        
        include: {
            Boleto: {
                include: {
                    Financeira: true,
                }
            },
            cliente: {
                include: {
                    DPessoaisCliente: true,
                    EnderecoCliente: true

                }
            },
            colaborador:{
                include: {
                    Equipe: true,

                    
                }
            },
            Contemplacao: true,

            
        }
    })

    return res.status(200).json(contratos)
  }
  
}