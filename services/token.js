import jwt from 'jsonwebtoken';
import models from '../models';
import config from '../config';

// Verificar si el token es valido
let checkToken = async(token) => {
    let __id = null;
    try {
        const {_id} = await jwt.decode(token);
        __id = _id;
    } catch (error) {
        return false;
    }
    const user = await models.User.findOne({_id:__id, status: 1}); // Obtener ID de usuario con token generado
    if(user){
        const token = jwt.sign({_id:__id}, config.secret, {expiresIn: '1d'});
        return {token,rol:user.rol};
    } else {
        return false;
    }
}

let encode = async(_id, rol, email, name, customerId, customerName) => {
    const token = jwt.sign({_id, rol, email, name, customerId, customerName}, config.secret, {expiresIn: '1d'}); // generar token con jwt
    return token;
}

let decode = async(token) => {
    try {
        const {_id} = await jwt.verify(token, config.secret);
        const user = await models.User.findOne({_id, status:1}); // Verificar que el usuario exista y este activo
        if(user){ // Validar usuario
            return user;
        } else {
            return false;
        }
    } catch (error) {
        const newToken = await checkToken(token);
        return newToken;
    }
}

export default {
    encode,
    decode
}