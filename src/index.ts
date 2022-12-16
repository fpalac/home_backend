import express, {Request, Response } from 'express';
import dotenv from 'dotenv';
import conectarDB from './db';
import usuarioRoutes from './routes/usuarioRoutes';
import pacienteRoutes from './routes/pacienteRoutes';


const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

console.log(process.env.MONGO_URI);

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

app.set('port', process.env.PORT || 4000);
//const port = process.env.PORT || 4000;

app.use(express.urlencoded({extended: false}));

app.listen(app.get('port'),()=>{
    console.log('server on port 4000');
})