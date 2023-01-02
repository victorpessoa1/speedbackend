import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";

type TokenPayload = {
  uuid : string
  iat: number
  exp: number
}

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const {authorization} = req.headers

  if(!authorization){
    return res.status(401).json({"error": "Token não fornecido"})
  }

  const [, token] = authorization.split(" ")
  console.log('tudo certo ate antes do trycatch');
  
  try {
    const tokenDecodificado = verify(token, process.env.SECRET ?? '')
    const {uuid} = tokenDecodificado as TokenPayload
    console.log('log 2');
    
    
    const colaborador = await prismaClient.colaborador.findUnique({
      where: {
        uuid
      }
      
    })
    console.log(uuid);

    
    if(!colaborador)
    {
      return res.status(401).json({"error": "Colaborador invalido"})
    }

    req.uuid = uuid
    next()
  } catch (error) {
    return res.status(401).json({"error": "Token invalido"})
  }
}