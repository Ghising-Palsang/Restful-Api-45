const logInCheck = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const orderDetailCtrl = require('./order-detail.controller');
const orderDetailDTO = require('./order-detail.validator');

const orderDetailRouter = require('express').Router();



// Add to Cart
orderDetailRouter.post('/',logInCheck,bodyValidator(orderDetailDTO),orderDetailCtrl.addToCart)
orderDetailRouter.get('/', logInCheck, orderDetailCtrl.getMyCartList)
orderDetailRouter.patch('/:orderDetailId', logInCheck, orderDetailCtrl.updateMyCart)

module.exports = orderDetailRouter;