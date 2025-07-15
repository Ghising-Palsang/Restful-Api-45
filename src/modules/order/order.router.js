const logInCheck = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const orderCtrl = require('./order.controller');
const CheckOutDTO = require('./order.validator');

const orderRouter = require('express').Router()

orderRouter.post('/',logInCheck,bodyValidator(CheckOutDTO),orderCtrl.checkout)
orderRouter.get('/',logInCheck, orderCtrl.listMyOrders)

// Payment
orderRouter.get('/:orderId', logInCheck, orderCtrl.initiatePayment)

module.exports = orderRouter;