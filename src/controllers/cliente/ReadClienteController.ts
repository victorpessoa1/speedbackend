import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class ReadClienteController {
  
  async clientes(req: Request, res: Response) {
    
    
    try {

    const login = await prismaClient.login.findUnique({where:{colaborador_uuid: req.uuid}})
    if(!login){
      return res.status(400).json("erro no login")
    }
   
    console.log(login.acesso);
        switch (login.acesso) {
          case "4":
            const clientesColaborador = await prismaClient.cliente.findMany({
              where: {
                colaborador_uuid : req.uuid
              }
            })
        
            return res.status(200).json(clientesColaborador)


          case "5":
            const clientesTotal = await prismaClient.cliente.findMany({
              
            })
        
            return res.status(200).json(clientesTotal)

          default:
            return res.status(500).json({
            message: 'Erro, acesso inválido'
        })
      }
    
      } catch (error) {
          return res.status(500).json({
            error: error,
            message: 'Erro ao listar todos os clientes'
        })
        }
  }


  // async cliente(req: Request, res: Response) {
  //   const {nomeCompleto} = req.body
  //   try {
  //     const cliente = await prismaClient.cliente.findMany({
  //       where: {
  //         nomeCompleto
  //       }
  //     })
    
  //   return res.status(200).json(cliente)

  //   } catch (error) {
  //     return res.status(500).json({
  //       error: error,
  //       message: 'Cliente não encontrado'
  //   })
  //   }
    
  // }
}
