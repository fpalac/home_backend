import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarid';


const UsuariosSchema = new mongoose.Schema({
    identificacion: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
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
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

UsuariosSchema.pre('save', async function (next) {
    //verificar si no esta hasheado 
    if(!this.isModified("password")){
        next();
    }
    //hashear password
    const salt = await  bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//UsuariosSchema.methods.validPassword = async function(passwordForm: string | Buffer): Promise<boolean> {
    //return await bcrypt.compare(passwordForm, this.password);
//}

const Usuario =  mongoose.model("Usuario",UsuariosSchema);
export default Usuario;