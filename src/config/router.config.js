
const router = require('express').Router()
const authRouter = require('../modules/auth/auth.router');
const bannerRouter = require('../modules/banner/banner.router');
const brandRouter = require('../modules/brand/brand.router');
const categoryRouter = require('../modules/category/category.router');
const chatRouter = require('../modules/chat/chat.router');
const orderDetailRouter = require('../modules/order-detail/order-detail.router');
const orderRouter = require('../modules/order/order.router');
const productRouter = require('../modules/product/product.router');
const publicRouter = require('../modules/public/public.router');
const transactionRouter = require('../modules/transaction/transaction.router');
const userRouter = require('../modules/user/user.router');
// TODO : Defactor( Interface Segregation Principle )



router.use('/auth',authRouter)
router.use('/brand',brandRouter)
router.use('/category',categoryRouter)
router.use('/product',productRouter)
router.use('/order-detail',orderDetailRouter)
router.use('/order', orderRouter)

router.use('/transaction',transactionRouter)
router.use('/banner', bannerRouter)
router.use('/chat', chatRouter)
router.use('/user', userRouter)
router.use('/public',publicRouter);

module.exports = router;