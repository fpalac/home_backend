import jwt from 'jsonwebtoken';

const generarJWT = (id: String)=>{
    return jwt.sign({id}, process.env.JWT_SECRET || 'probando', {expiresIn: "30d"
});
}

export default generarJWT;