import models from  '../models';

// add category
let add = async (req,res,next) => {
    try {
        const reg = await models.Category.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// get a category
let query = async (req,res,next) => {
    try {
        const reg = await models.Category.findOne({_id: req.query._id});
        if(!reg){
            send.status(404).send({
                message: 'Category not found'
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

// get all categories
let list = async (req,res,next) => {
    try {
        // agregando filtros de busqueda
        if (req.body.customer){
            const reg = await models.Category.find({ customer: req.body.customer},{createdAt: 0}) // ocultar createdAt en resultado
            .sort({'createdAt': -1}); // ordenar descendentemente por fecha de creacion
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

// update a cateogory
let update = async (req,res,next) => {
    try {
        const reg = await models.Category.findByIdAndUpdate({_id: req.body._id},{customer: req.body.customer, name: req.body.name, description: req.body.description});
        res.status(200).json(reg)
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// remove category
let remove = async (req,res,next) => {
    try {
        const reg = await models.Category.findByIdAndDelete({_id: req.body._id});
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// active a category
let activate = async (req,res,next) => {
    try {
        const reg = await models.Category.findByIdAndUpdate({_id: req.body._id}, {status: 1})
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error',
            error
        });
        next(error);
    }
};

// deactivate a category
let deactivate = async (req,res,next) => {
    try {
        const reg = await models.Category.findByIdAndUpdate({_id: req.body._id}, {status: 0})
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
    update,
    remove,
    activate,
    deactivate
}