import { Express, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario from "../models/Usuario";

interface Requestx extends Request{
  user?: string | JwtPayload;
}

const checkAuth = async(req: Requestx, res: Response, next: NextFunction) =>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hola') as JwtPayload;      
        const usuario = await Usuario.findById(decoded.id).select("-password -token -confirmado") as JwtPayload;
        req.user=usuario;
        //console.log(req.user);
        next();
    } catch (error) {
      const e = new Error("Token no valido")
      res.status(403).json({msg: e.message});
    }
    if(!token){
      const error = new Error("Token no valido e inexistente")
      res.status(403).json({msg: error.message});
    }
    next();
  }

}

export default checkAuth;