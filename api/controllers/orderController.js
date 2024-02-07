const models = require('../models');

function index(req, res) {
    models.Order.findAll().then(result => {
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

    models.Order.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: "Order not found",
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
    const order = {
        productId: req.body.productId,
        amount: req.body.amount,
        acquired: req.body.acquired
    }

    models.Order.create(order).then(result => {
        res.status(201).json({
            message: "Order created successfully",
            order: result
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
    const updatedOrder = {
        productId: req.body.title,
        amount: req.body.price,
        acquired: req.body.price
    }

    models.Order.update(updatedOrder, {where: {id: id}}).then(result => {
        res.status(201).json({
            message: "Order updated successfully",
            order: updatedOrder
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

    models.Order.destroy({where: {id: id}}).then(result => {
        res.status(201).json({
            message: "Order deleted successfully",
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