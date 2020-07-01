import models from '../models';
import mongoose from 'mongoose';

// add sale
let add = async (req, res, next) => {
    try {
        const reg = await models.Sale.create(req.body);

        // Actualizar stock
        let details = req.body.details;
        details.map(function (item) {
            decreaseStock(item._id, item.quantity);
        })

        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// get a sale
let query = async (req, res, next) => {
    try {
        const reg = await models.Sale.findOne({ _id: req.query._id })
            .populate('user', { name: 1 })
            .populate('person', { name: 1 });
        if (!reg) {
            send.status(404).send({
                message: 'Sale not found'
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

// get all Sales
let list = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let value = req.query.value;
        const reg = await models.Sale.find({ $or: [{ 'numVoucher': new RegExp(value, 'i') }, { 'serieVoucher': new RegExp(value, 'i') }], customer: req.body.customer }) // ocultar createdAt en resultado
            .populate('user', { name: 1 })
            .populate('person', { name: 1, typeDni: 1, numDni: 1, address: 1, tel: 1, email: 1 })
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

// active a Sale
let activate = async (req, res, next) => {
    try {
        const reg = await models.Sale.findByIdAndUpdate({ _id: req.body._id }, { status: 1 })
        
        // Actualizar stock
        let details = reg.details;
        details.map(function (item) {
            decreaseStock(item._id, item.quantity);
        })

        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// deactivate a Sale
let deactivate = async (req, res, next) => {
    try {
        const reg = await models.Sale.findByIdAndUpdate({ _id: req.body._id }, { status: 0 })

        // Actualizar stock
        let details = reg.details;
        details.map(function (item) {
            increaseStock(item._id, item.quantity);
        })

        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// Obtener las ventas del ultimo año
let yearGraph = async(req,res,next) => {
    try {
        const reg = await models.Sale.aggregate([
            { 
                $match: { 
                    customer: mongoose.Types.ObjectId(req.body.customer)
                } 
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$createdAt"},
                        year: {$year: "$createdAt"}
                    },
                    total: {$sum: "$total"},
                    number: {$sum:1}
                }
            },
            {
                $sort: {
                    "_id.year" : -1,
                    "_id.mes": -1
                }
            }
        ]).limit(12);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }    
}

// Obtener el total historico
let totalSales = async(req,res,next) => {
    try {
        const reg = await models.Sale.aggregate([
            { 
                $match: { 
                    customer: mongoose.Types.ObjectId(req.body.customer),
                    status: 1
                } 
            },
            {
                $group: {
                    _id: {customer: "$customer"},
                    total: {$sum: "$total"}
                }
            }
        ]);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }    
}

// Obtener el total de las ultimas 24hs
let totalSalesMonth = async(req,res,next) => {
    try {
        const reg = await models.Sale.aggregate([
            { 
                $match: { 
                    customer: mongoose.Types.ObjectId(req.body.customer),
                    createdAt : { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // calculate 30 days before
                    status: 1
                } 
            },
            {
                $group: {
                    _id: {customer: "$customer"},
                    total: {$sum: "$total"}
                }
            }
        ]);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }    
}

// get all Sales between dates
let listDates = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let start = req.query.start;
        let end = req.query.end;
        const reg = await models.Sale.find({"createdAt" : {"$gte" : start, "$lt" : end}})
            .populate('user', { name: 1 })
            .populate('person', { name: 1 })
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

// increase stock
let increaseStock = async (idProduct, quantity) => {
    let { stock } = await models.Product.findOne({ _id: idProduct });
    let newStock = parseInt(stock) + parseInt(quantity);
    const reg = await models.Product.findByIdAndUpdate({ _id: idProduct }, { stock: newStock });
};

// decrease stock
let decreaseStock = async (idProduct, quantity) => {
    let { stock } = await models.Product.findOne({ _id: idProduct });
    let newStock = parseInt(stock) - parseInt(quantity);
    const reg = await models.Product.findByIdAndUpdate({ _id: idProduct }, { stock: newStock });
};

export default {
    add,
    query,
    list,
    listDates,
    yearGraph,
    totalSales,
    totalSalesMonth,
    activate,
    deactivate
}