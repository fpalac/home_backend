import express, {Request, Response } from "express";
import {registrar, perfil, confirmar, autenticar} from '../ctrl/usuarioController'
import checkAuth from '../middleware/authMiddleware';

const router = express.Router();

//acceso publico
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

//acceso privado al perfil
router.get("/perfil", checkAuth, perfil);

export default router;