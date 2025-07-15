const logInCheck = require('../../middlewares/auth.middleware');
const uploader = require('../../middlewares/file-parser.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const brandCtrl = require('./brand.controller');
const BrandDataDTO = require('./brand.validator');

const brandRouter = require('express').Router();

brandRouter.post('/',logInCheck, uploader().single("logo"),bodyValidator(BrandDataDTO),brandCtrl.storeBrand)
brandRouter.get('/',logInCheck, brandCtrl.listAllBrands)

brandRouter.get('/:id',logInCheck, brandCtrl.getBrandDetailById)
brandRouter.put('/:id',logInCheck, uploader().single("logo"),bodyValidator(BrandDataDTO), brandCtrl.updateBrand)
brandRouter.delete('/:id', logInCheck, brandCtrl.deleteById)

module.exports = brandRouter;