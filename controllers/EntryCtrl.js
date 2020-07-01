import models from '../models';
import mongoose from 'mongoose';

// add entry
let add = async (req, res, next) => {
    try {
        const reg = await models.Entry.create(req.body);

        // Actualizar stock
        let details = req.body.details;
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

// get an entry
let query = async (req, res, next) => {
    try {
        const reg = await models.Entry.findOne({ _id: req.query._id })
            .populate('user', { name: 1 })
            .populate('person', { name: 1 });
        if (!reg) {
            send.status(404).send({
                message: 'Entry not found'
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

// get all Entries
let list = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let value = req.body.value;
        const reg = await models.Entry.find({ $or: [{ 'numVoucher': new RegExp(value, 'i') }, { 'serieVoucher': new RegExp(value, 'i') }], customer: req.body.customer }) // ocultar createdAt en resultado
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

// Obtener las entradas del ultimo año
let yearGraph = async(req,res,next) => {
    try {
        const reg = await models.Entry.aggregate([
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

// get all Entries between dates
let listDates = async (req, res, next) => {
    try {
        // agregando filtros de busqueda
        let start = req.query.start;
        let end = req.query.end;
        const reg = await models.Entry.find({"createdAt" : {"$gte" : start, "$lt" : end}})
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

// active an Entry
let activate = async (req, res, next) => {
    try {
        const reg = await models.Entry.findByIdAndUpdate({ _id: req.body._id }, { status: 1 })
        
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

// deactivate an Entry
let deactivate = async (req, res, next) => {
    try {
        const reg = await models.Entry.findByIdAndUpdate({ _id: req.body._id }, { status: 0 })

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
    yearGraph,
    listDates,
    activate,
    deactivate
}