import mongoose from 'mongoose';
import { mongodb } from './keys';

async function conectarDB() {
    try {
        const db = await mongoose.connect(mongodb.URI);
        const url = `${db.connection.host}:${db.connection.port}`; 
        console.log(`database is connected to ${db.connection.host}:${db.connection.port}`);    
    } catch (error) {
        console.log(error);
    }
    
};

export default conectarDB;
