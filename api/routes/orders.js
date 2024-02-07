const express = require('express');
const orderController = require('../controllers/orderController')
const router = express.Router();

router.get('/', orderController.index)

router.get('/:id', orderController.show)

router.post('/', orderController.save)

router.patch('/:id', orderController.update)

router.delete('/:id', orderController.destroy)


module.exports = router;