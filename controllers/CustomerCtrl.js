import models from '../models';

// add customer
let add = async (req, res, next) => {
    try {
        const reg = await models.Customer.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// get a customer
let query = async (req, res, next) => {
    try {
        const reg = await models.Customer.findOne({ _id: req.query._id });
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

// get all customers
let list = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let value = req.query.value;
        const reg = await models.Customer.find({ $or: [{ 'name': new RegExp(value, 'i') }, { 'email': new RegExp(value, 'i') }] }, { createdAt: 0 }) // ocultar createdAt en resultado
            .sort({ 'createdAt': -1 }); // ordenar descendentemente por fecha de creacion
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// Obtener el total de clientes
let totalCustomers = async(req,res,next) => {
    try {
        const reg = await models.Customer.count();
        res.status(200).json({
            total: reg
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }    
}

// update a user
let update = async (req, res, next) => {
    try {
        const reg = await models.Customer.findByIdAndUpdate(
            { _id: req.body._id },
            { customerId: req.body.customerId, name: req.body.name, typeDni: req.body.typeDni, numDni: req.body.numDni, address: req.body.address, tel: req.body.tel, email: req.body.email });
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// remove customer
let remove = async (req, res, next) => {
    try {
        const reg = await models.Customer.findByIdAndDelete({ _id: req.body._id });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// active a Customer
let activate = async (req, res, next) => {
    try {
        const reg = await models.Customer.findByIdAndUpdate({ _id: req.body._id }, { status: 1 })
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// deactivate a Customer
let deactivate = async (req, res, next) => {
    try {
        const reg = await models.Customer.findByIdAndUpdate({ _id: req.body._id }, { status: 0 })
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

export default {
    add,
    query,
    list,
    totalCustomers,
    update,
    remove,
    activate,
    deactivate
}