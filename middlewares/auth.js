import tokenService from '../services/token';

let verifyUser = async(req,res,next) => {
    if(!req.headers.token){
        return res.status(401).send({
            message: 'Invalid token'
        })
    }
    // Verificar si el usuario autenticado tiene un rol valido
    const response = await tokenService.decode(req.headers.token);
    if(response.rol == 'admin' || response.rol == 'seller' || response.rol == 'control'){
        next();
    } else {
        return res.status(403).send({
            message: 'Unauthorized user'
        })
    }
}

let verifyAdmin = async(req,res,next) => {
    if(!req.headers.token){
        return res.status(401).send({
            message: 'Invalid token'
        })
    }
    // Verificar si el usuario autenticado tiene un rol valido
    const response = await tokenService.decode(req.headers.token);
    if(response.rol == 'admin'){
        next();
    } else {
        return res.status(403).send({
            message: 'Unauthorized user'
        })
    }
}

let verifyStockControl = async(req,res,next) => {
    if(!req.headers.token){
        return res.status(401).send({
            message: 'Invalid token'
        })
    }
    // Verificar si el usuario autenticado tiene un rol valido
    const response = await tokenService.decode(req.headers.token);
    if(response.rol == 'admin' || response.rol == 'control'){
        next();
    } else {
        return res.status(403).send({
            message: 'Unauthorized user'
        })
    }
}

let verifySeller = async(req,res,next) => {
    if(!req.headers.token){
        return res.status(401).send({
            message: 'Invalid token'
        })
    }
    // Verificar si el usuario autenticado tiene un rol valido
    const response = await tokenService.decode(req.headers.token);
    if(response.rol == 'admin' || response.rol == 'seller'){
        next();
    } else {
        return res.status(403).send({
            message: 'Unauthorized user'
        })
    }
}

export default {
    verifyUser,
    verifyAdmin,
    verifyStockControl,
    verifySeller
}