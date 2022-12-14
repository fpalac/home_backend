import express, {Request, Response } from "express";
import Usuario from '../models/Usuario';
import generarJWT from "../helpers/generarJWT";
import bcrypt from 'bcrypt';

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

const perfil = (req: Request, res: Response) => {
    res.json({msg: "Mostrando perfil"})
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

export{
    registrar,
    perfil,
    confirmar,
    autenticar
};