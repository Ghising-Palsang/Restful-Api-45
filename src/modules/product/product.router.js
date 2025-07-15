const logInCheck = require('../../middlewares/auth.middleware');
const uploader = require('../../middlewares/file-parser.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const productCtrl = require('./product.controller');
const ProductDataDTO = require('./product.validator');

const productRouter = require('express').Router();

productRouter.post('/',logInCheck, uploader().array("images"),bodyValidator(ProductDataDTO),productCtrl.storeProduct)
productRouter.get('/',logInCheck, productCtrl.listAllProducts)

productRouter.get('/:id',logInCheck, productCtrl.getProductDetailById)
productRouter.put('/:id',logInCheck, uploader().array("images"),bodyValidator(ProductDataDTO), productCtrl.updateProduct)
productRouter.delete('/:id', logInCheck, productCtrl.deleteById)

module.exports = productRouter;