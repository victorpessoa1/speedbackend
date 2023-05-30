import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class Logout {
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