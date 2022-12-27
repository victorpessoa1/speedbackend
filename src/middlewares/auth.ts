import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  colaborador_uuid : string
  iat: number
  exp: number
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const {authorization} = req.headers

  if(!authorization){
    return res.status(401).json({"error": "Token não fornecido"})
  }

  const [, token] = authorization.split(" ")

  try {
    const decodificado = verify(token, "segredoSecreto")
    const {colaborador_uuid} = decodificado as TokenPayload

    req.colaboradorUuid = colaborador_uuid
    next()
  } catch (error) {
    return res.status(401).json({"error": "Token invalido"})

  }
}