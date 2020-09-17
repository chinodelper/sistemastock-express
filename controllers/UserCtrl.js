import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';
import nodemailer from 'nodemailer'
import config from '../config';

// add user
let add = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const reg = await models.User.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// get a user
let query = async (req, res, next) => {
    try {
        const reg = await models.User.findOne({ _id: req.query._id });
        if (!reg) {
            send.status(404).send({
                message: 'Internal Error',
            })
        } else {
            res.status(200).json(reg);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// get all users
let list = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        if (req.body.customerId) {
            const reg = await models.User.find({ customer: req.body.customerId}, { createdAt: 0 }) // ocultar createdAt en resultado
            .populate('customer',{name:1, customerId:1}) // indicamos el nombre del modelo customer
            .sort({ 'createdAt': -1 }); // ordenar descendentemente por fecha de creacion
            res.status(200).json(reg);
        } 
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// update a user
let update = async (req, res, next) => {
    try {
        let pass = req.body.password;
        const reg0 = await models.User.findOne({ _id: req.body._id });

        // Encriptamos la contraseña solo si el usuario envia una contraseña nueva
        if (pass != reg0.password) {
            req.body.password = await bcrypt.hash(pass, 10);
        }

        const reg = await models.User.findByIdAndUpdate(
            { _id: req.body._id },
            { name: req.body.name, rol: req.body.rol, customerId: req.body.customerId, customerName: req.body.customerName, typeDni: req.body.typeDni, numDni: req.body.numDni, address: req.body.address, tel: req.body.tel, email: req.body.email, password: req.body.password });
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// remove user
let remove = async (req, res, next) => {
    try {
        const reg = await models.User.findByIdAndDelete({ _id: req.body._id });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// active a User
let activate = async (req, res, next) => {
    try {
        const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { status: 1 })
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// deactivate a User
let deactivate = async (req, res, next) => {
    try {
        const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { status: 0 })
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// login user
let login = async (req, res, next) => {
    try {
        let user = await models.User.findOne({ email: req.body.email}).populate('customer',{name:1, _id:1});
        // Verificamos si el usuario existe
        if (user) {
            // Verificamos si la contraseña es correcta
            let match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                // verificamos si el usuario esta activo
                if (!user.status) {
                    res.status(401).json({
                        message: 'Inactive user status'
                    });
                } else {
                    let tokenReturn = await token.encode(user._id, user.rol, user.email, user.name, user.customer._id, user.customer.name);
                    res.status(200).json({ user, tokenReturn });
                }
            } else {
                res.status(404).send({
                    message: 'Invalid password'
                })
            }
        } else {
            res.status(404).send({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error',
            error
        });
        next(error);
    }
}

let forgotPassword = async(req, res, next) => {

    const {email} = req.body;
    let user = await models.User.findOne({ email }).populate('customer',{name:1, _id:1});
    if(!user){ // verificamos si el usuario existe
        return res.status(400).json({error: "User not found"})
    }

    let tokenReturn = await token.encode(user._id, user.rol, user.email, user.name, user.customer._id, user.customer.name); // generamos token con JWT
    const data = {
        from: 'Damian Del Percio <chinodelper@gmail.com>',
        to: email,
        subject: 'Blanqueo de contraseña solicitada',
        html: `
            <h2>Haga click en el siguiente link para continuar con el proceso.</h2>
            <p>${config.domain}/reset/${tokenReturn}</p>
        `
    }

    const smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: ",
            pass: ""
        }
    });

    return await models.User.updateOne({resetLink: tokenReturn}, (err, success) => {
        if(err){
            return res.status(400).json({error: 'reset password link error'});
        } else {
            smtpTransport.sendMail(data, (error, response) => {
                if(error){
                    console.log('failed to send email')
                    return res.status(500).json({error: 'failed to send email'})
                } else {
                    console.log('email sent succesfully')
                    return res.status(200).json({error: 'email sent succesfully'})
                }
            })
        }
    })
}

export default {
    add,
    query,
    list,
    update,
    remove,
    activate,
    deactivate,
    login,
    forgotPassword
}