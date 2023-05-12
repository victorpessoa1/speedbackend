import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateTarefaController {
 
  async criarvariastarefas(req: Request, res: Response) {

    try {
      const { listaTarefas } = req.body
  
      console.log(req.body);
      
      const tarefa = await prismaClient.tarefas.createMany({
        data: listaTarefas
        
  
      })
  
        return res.status(201).json({tarefa, message: "tarefas adicionadas à agenda com sucesso"})

    } catch (error) {
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar tarefas"
       })
     }
  }

  async criarumatarefa(req: Request, res: Response) {

    try{

      const {colaborador_uuid} = req.params
        const {  nometarefa, nomecliente, telefonecliente, horapraligar, obs } = req.body
      
        console.log(colaborador_uuid);
        

        const tarefa = await prismaClient.tarefas.create({
          data: {
            nometarefa,
            nomecliente,
            telefonecliente,
            horapraligar,
            colaborador_uuid: colaborador_uuid,
            obs,
          },
  
        })
        return res.status(201).json({tarefa, message: "tarefa adicionado à agenda com sucesso"})
    }catch (error) {
      return res.status(500).json(
       { 
       error: error,
       message: "Falha ao criar tarefas"
       })
     }
      
    } 
  
  }