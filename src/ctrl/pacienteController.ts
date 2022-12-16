import express, {Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Paciente from "../models/Paciente";

interface Requestx extends Request{
    user?: string | JwtPayload;
  }

const agregarPaciente = (req: Requestx, res: Response) =>{
    
    const paciente = new Paciente(req.body);
    const {_id} = req.user as JwtPayload;
    console.log(paciente);
}

const obtenerPacientes = (req: Request, res: Response) =>{
   console.log("hola mundo");
}

export {
    agregarPaciente,
    obtenerPacientes
}