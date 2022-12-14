import { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

const checkAuth = (req: Request, res: Response, next: NextFunction) =>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hola');
        const usuario = Usuario.findById(decoded);
        console.log(decoded);
    } catch (error) {
    
        res.status(403).json({msg: "error"});
    }
    next();
  }

}

export default checkAuth;