import models from  '../models';
import mongoose from 'mongoose';

// add product
let add = async (req,res,next) => {
    try {
        const reg = await models.Product.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal error'
        });
        next(error);
    }
};

// get a Product
let query = async (req,res,next) => {
    try {
        const reg = await models.Product.findOne({_id: req.query._id})
        .populate('category',{name:1}); // indicamos el nombre del modelo category
        if(!reg){
            res.status(404).send({
                message: 'Product not found'
            })
        } else {
            res.status(200).json(reg);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

// get a Product by code
let queryCode = async (req,res,next) => {
    try {
        const reg = await models.Product.findOne({code: req.query.code, customer: req.body.customer})
        .populate('category',{name:1}); // indicamos el nombre del modelo category
        if(!reg){
            res.status(404).send({
                message: 'Product not found'
            })
        } else {
            res.status(200).json(reg);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

// get all products
let list = async (req,res,next) => {
    try {
        // agregando filtros de busqueda
        let value = req.query.value;
        if (req.body.customer){
            const reg = await models.Product.find({$or: [{ 'name': new RegExp(value, 'i') }, { 'description': new RegExp(value, 'i') }],  customer: req.body.customer},{createdAt: 0}) // ocultar createdAt en resultado
            .populate('category',{name:1}) // indicamos el nombre del modelo category
            .sort({'createdAt': -1}); // ordenar descendentemente por fecha de creacion
            res.status(200).json(reg);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

// Obtener el total de productos
let totalProducts = async(req,res,next) => {
    try {
        const reg = await models.Product.countDocuments({
            customer: req.body.customer
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

// update a product
let update = async (req,res,next) => {
    try {
        const reg = await models.Product.findByIdAndUpdate(
            {_id: req.body._id},
            {category: req.body.category, code: req.body.code, customer: req.body.customer, name: req.body.name, description: req.body.description, price: req.body.price, stock: req.body.stock});
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

// remove product
let remove = async (req,res,next) => {
    try {
        const reg = await models.Product.findByIdAndDelete({_id: req.body._id});
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

// active a product
let activate = async (req,res,next) => {
    try {
        const reg = await models.Product.findByIdAndUpdate({_id: req.body._id}, {status: 1})
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

// deactivate a product
let deactivate = async (req,res,next) => {
    try {
        const reg = await models.Product.findByIdAndUpdate({_id: req.body._id}, {status: 0})
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal error',
            error
        });
        next(error);
    }
};

export default {
    add,
    query,
    queryCode,
    list,
    totalProducts,
    update,
    remove,
    activate,
    deactivate
}