const logInCheck = require('../../middlewares/auth.middleware')
const uploader = require('../../middlewares/file-parser.middleware')
const bodyValidator = require('../../middlewares/validator.middleware')
const bannerCtrl = require('./banner.controller')
const BannerCreateDTO = require('./banner.validator')

const bannerRouter = require('express').Router()

bannerRouter.post('/', logInCheck,uploader().single('image'), bodyValidator(BannerCreateDTO), bannerCtrl.addBanner)
bannerRouter.get('/', logInCheck, bannerCtrl.listAllBanners)

bannerRouter.get('/for-home', logInCheck, bannerCtrl.listAllForHomeBanners)

bannerRouter.get('/', logInCheck, bannerCtrl.getSingleRows)
bannerRouter.put('/', logInCheck,uploader().single('image'),bodyValidator(BannerCreateDTO), bannerCtrl.updateBannerById)
bannerRouter.delete('/', logInCheck, bannerCtrl.deleteBannerById)

module.exports = bannerRouter