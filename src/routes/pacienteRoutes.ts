import express, {Request, Response } from "express";
import checkAuth from "../middleware/authMiddleware";
import { agregarPaciente, obtenerPacientes } from "../ctrl/pacienteController";

const router = express.Router();

router.route("/").post(checkAuth, agregarPaciente).get(checkAuth, obtenerPacientes);

export default router;
