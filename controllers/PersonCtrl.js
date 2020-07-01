import models from '../models';

// add person
let add = async (req, res, next) => {
    try {
        const reg = await models.Person.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// get a person
let query = async (req, res, next) => {
    try {
        const reg = await models.Person.findOne({ _id: req.query._id });
        if (!reg) {
            send.status(404).send({
                message: 'Internal Error',
                error
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

// get all people
let list = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let value = req.query.value;
        const reg = await models.Person.find({ $or: [{ 'name': new RegExp(value, 'i') }, { 'email': new RegExp(value, 'i') }], customer: req.body.customer }, { createdAt: 0 }) // ocultar createdAt en resultado
            .populate('customer',{name:1, customerId:1}) // indicamos el nombre del modelo customer
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

// Obtener el total de productos
let totalClients = async(req,res,next) => {
    try {
        const reg = await models.Person.countDocuments({
            customer: req.body.customer,
            typePerson: 'client'
        });
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

// get all clients
let listClients = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let value = req.query.value;
        const reg = await models.Person.find({ $or: [{ 'name': new RegExp(value, 'i') }, { 'email': new RegExp(value, 'i') }], 'typePerson': 'client', customer: req.body.customer }, { createdAt: 0 }) // ocultar createdAt en resultado y filtrar por customer
            .populate('customer',{name:1, customerId:1}) // indicamos el nombre del modelo customer
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

// get all providers
let listProviders = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let value = req.query.value;
        const reg = await models.Person.find({ $or: [{ 'name': new RegExp(value, 'i') }, { 'email': new RegExp(value, 'i') }], 'typePerson': 'provider', customer: req.body.customer }, { createdAt: 0 }) // ocultar createdAt en resultado y filtrar por customer
            .populate('customer',{name:1, customerId:1}) // indicamos el nombre del modelo customer
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


// update a person
let update = async (req, res, next) => {
    try {
        const reg = await models.Person.findByIdAndUpdate(
            { _id: req.body._id },
            {customer: req.body.customer, name: req.body.name, typePerson: req.body.typePerson, typeDni: req.body.typeDni, numDni: req.body.numDni, address: req.body.address, tel: req.body.tel, email: req.body.email});
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// remove person
let remove = async (req, res, next) => {
    try {
        const reg = await models.Person.findByIdAndDelete({ _id: req.body._id });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// active a Person
let activate = async (req, res, next) => {
    try {
        const reg = await models.Person.findByIdAndUpdate({ _id: req.body._id }, { status: 1 })
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// deactivate a Person
let deactivate = async (req, res, next) => {
    try {
        const reg = await models.Person.findByIdAndUpdate({ _id: req.body._id }, { status: 0 })
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
    listClients,
    listProviders,
    totalClients,
    update,
    remove,
    activate,
    deactivate
}