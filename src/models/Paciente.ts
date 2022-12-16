import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarid';


const PacientesSchema = new mongoose.Schema({
    identificacion: {
        type: String,
        //required: true,
        //unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        //required: true
    },
    email: {
        type: String,
       // required: true,
        unique: true,
        trim: true
    },
    direccion: {
        type: String,
        //required: true,
        trim: true
    },
    telefono: {
        type: String,
        //required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
},
{
    timestamps: true,
});




const Paciente =  mongoose.model("Paciente",PacientesSchema);
export default Paciente;