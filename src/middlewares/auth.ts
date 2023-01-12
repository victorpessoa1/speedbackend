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
  
  try {

      const verificandoToken = await prismaClient.blacklist.findUnique({where: {tokenexpirado: token}})

      if(verificandoToken) {
          return res.status(401).json({"error": "Token expirado"})
      }
  
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "token invalido"
      })
    }
  

  try {
    const tokenDecodificado = verify(token, process.env.SECRET ?? '')
    const {uuid} = tokenDecodificado as TokenPayload
     
    const colaborador = await prismaClient.colaborador.findUnique({
      where: {
        uuid
      }
      
    })

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