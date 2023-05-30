import { compare, } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
import process from 'process';

  export class AuthColaboradorController {
    async login(req: Request, res: Response) {
     try{
      const {email, senha} = req.body

      const login = await prismaClient.login.findUnique({
        where: 
          {
            email
          }
      })

      if(!login)
      {
        return res.json({error: "login invalido (usuario invalido)"})
      }

      const senhaValida = await compare(senha, login.senha)
      
      if(!senhaValida)
      {
        return res.json({error: "login invalido (senha invalida)"})
      }

      const token = sign({uuid: login.colaborador_uuid}, process.env.SECRET ?? '', {expiresIn: "9h" })
    
      const  {colaborador_uuid} = login

      const acesso = login.acesso
      req.acesso = login.acesso

    return res.json({login:{colaborador_uuid, email, acesso }, token})
     }
     catch(err){
      return res.json({"message": "erro de login"})
     }
      
  }

  async loginServer(req: Request, res: Response) {
    try{
     const {email, senha} = req.body

     const login = await prismaClient.login.findUnique({
       where: 
         {
           email
         }
     })

     if(!login)
     {
       return res.json({error: "login invalido (usuario invalido)"})
     }

     const senhaValida = await compare(senha, login.senha)
     
     if(!senhaValida)
     {
       return res.json({error: "login invalido (senha invalida)"})
     }

     const token = sign({uuid: login.colaborador_uuid}, process.env.SECRET ?? '')
   
     const  {colaborador_uuid} = login

     const acesso = login.acesso
     req.acesso = login.acesso

   return res.json({login:{colaborador_uuid, email, acesso }, token})
    }
    catch(err){
     return res.json({"message": "erro de login"})
    }
     
 }

  
}