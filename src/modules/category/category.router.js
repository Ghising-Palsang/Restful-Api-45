const logInCheck = require('../../middlewares/auth.middleware');
const uploader = require('../../middlewares/file-parser.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const categoryCtrl = require('./category.controller');
const CategoryDataDTO = require('./category.validator');

const categoryRouter = require('express').Router();

categoryRouter.post('/',logInCheck, uploader().single("image"),bodyValidator(CategoryDataDTO),categoryCtrl.storeCategory)
categoryRouter.get('/',logInCheck, categoryCtrl.listAllCategories)

categoryRouter.get('/:id',logInCheck, categoryCtrl.getCategoryDetailById)
categoryRouter.put('/:id',logInCheck, uploader().single("image"),bodyValidator(CategoryDataDTO), categoryCtrl.updateCategory)
categoryRouter.delete('/:id', logInCheck, categoryCtrl.deleteById)

module.exports = categoryRouter;