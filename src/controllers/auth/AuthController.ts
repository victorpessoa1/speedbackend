import { compare, } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Request, Response} from 'express';
import { prismaClient } from '../../database/prismaClient';
import process from 'process';

  export class AuthColaboradorController {
    async autenticacao(req: Request, res: Response) {
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

    return res.json({login:{colaborador_uuid, email, acesso }, token})
     }
     catch(err){
      return res.json({"message": "erro de autenticacao"})
     }
      
  }

  async logout(req: Request, res: Response){
    try{
      const {authorization} = req.headers
      if(!authorization){
        return res.status(401).json({"error": "Token não fornecido"})
      }
      const [, token] = authorization.split(" ")
      const tokenExpirado = await prismaClient.blacklist.create({
        data: {
          tokenexpirado: token
        }
      })
      res.status(200).json({
        message: "usuario deslogado",
        tokenExpirado
      });
    }catch(err){
      return res.status(500).json({message: "erro no logout"});
    }
    
  }
}