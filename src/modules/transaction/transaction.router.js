const logInCheck = require('../../middlewares/auth.middleware');
const transactionCtrl = require('./transaction.controller');

const transactionRouter = require('express').Router()

// addpayment
transactionRouter.post('/:orderCode', logInCheck, transactionCtrl.addPayment)

module.exports = transactionRouter;