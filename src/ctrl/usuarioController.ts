import express, {Request, Response } from "express";
import Usuario from '../models/Usuario';
import generarJWT from "../helpers/generarJWT";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import { ReturnDocument } from "mongodb";
import generarId from "../helpers/generarid";


interface Requestx extends Request{
    user?: string | JwtPayload;
  }
//: Promise<void>
const registrar = async (req: Request, res: Response) => {
    const {identificacion} = req.body;

    //prevenir que este duplicado
    const existeUsurario = await Usuario.findOne({identificacion});
    if(existeUsurario){
        const error = new Error("Usuario ya esta registrado..");
        return res.status(400).json({msg: error.message});
    }
    
    try {
        const usuario = new Usuario(req.body);
        const usuario_save = await usuario.save();
        res.json(usuario_save);
    } catch (error) {
        console.log(error);
    }
    //console.log(req.body);
    //res.json({msg: "Registrando usuario..."})
};

const perfil = (req: Requestx, res: Response) => {
    const {user} = req;
    res.json({perfil: user});
};

const confirmar = async (req: Request, res: Response) => {
    const {token} = req.params;
    const usaurioConfirmar = await Usuario.findOne({token})
    //console.log(usaurioConfirmar);
    if(!usaurioConfirmar){
        const error = new Error("Token no valido..");
        return res.status(404).json({msg: error.message});        
    }

    try {
       usaurioConfirmar.token = "";
       usaurioConfirmar.confirmado = true;
       await usaurioConfirmar.save();
       res.json({msg: "Confirmando cuenta..."})
    } catch (error) {
        
    }
    
};

const autenticar = async (req: Request, res: Response) => {
    //comprobamos que el usuario existe
    const { email, password } = req.body;
    const pass: string = password
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error("Usuario no existe..");
        return res.status(404).json({msg: error.message});   
    }
    
    //comprobando si el ususario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no a sido confirmada..");
        return res.status(403).json({msg: error.message}); 
    }
    
    //revisar el password
    if(await bcrypt.compare(pass,usuario.password)){
        // autenticar con jsonwebtoken
        console.log(usuario);
        res.json({token: generarJWT(usuario.id)});
    }else{
        console.log("password incorrecto");
    } 
    
};

const olvidePassword =  async(req: Request, res: Response) =>{
    const {email} = req.body;
    const usuarioX = await Usuario.findOne({email});
    if(usuarioX){
        try {
            usuarioX.token = generarId();
            usuarioX.save();
            res.json({msg: "Hemos enviado un email con las instrucciones"})
        } catch (e) {
            const error = new Error("Falla al generar el ID")
            res.status(400).json({msg: error.message});
        }
    }else{
        const error = new Error("Usuario no registrado en la DB")
        res.status(400).json({msg: error.message});
    }
    //console.log(email);
}

const comprobarToken = async(req: Request, res: Response) =>{
    const {token} = req.params;
    const tokenX = await Usuario.findOne({token});
    if(tokenX){

    }else{
        const error = new Error("token no valido")
        res.status(400).json({msg: error.message});
    }
}

const nuevoPassword = async(req: Request, res: Response) =>{
    const {token} = req.params;
    const {password} = req.body;
    const usuarioX = await Usuario.findOne({token});
    if(usuarioX){
        try {
           usuarioX.token='';
           usuarioX.password = password;
           await usuarioX.save();
           res.json({msg: "Password modificado correctamente"});
        } catch (error) {
           const e = new Error("Hubo un error")
           res.status(400).json({msg: e.message});
        }
    }else{
        const error = new Error("Hubo un error")
        res.status(400).json({msg: error.message});
    }
}


export{
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
};