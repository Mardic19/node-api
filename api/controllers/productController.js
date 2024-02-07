const models = require('../models');

function index(req, res) {
    models.Product.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function show(req, res) {
    const id = req.params.id;

    models.Product.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: "Product not found",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function save(req, res) {
    const product = {
        title: req.body.title,
        price: req.body.price
    }

    models.Product.create(product).then(result => {
        res.status(201).json({
            message: "Product created successfully",
            product: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

function update(req, res) {
    const id = req.params.id;
    const updatedProduct = {
        title: req.body.title,
        price: req.body.price
    }

    models.Product.update(updatedProduct, {where: {id: id}}).then(result => {
        res.status(201).json({
            message: "Product updated successfully",
            product: updatedProduct
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

function destroy(req, res) {
    const id = req.params.id;

    models.Product.destroy({where: {id: id}}).then(result => {
        res.status(201).json({
            message: "Product deleted successfully",
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}