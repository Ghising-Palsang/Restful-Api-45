const { OrderDetailStatus } = require("../../config/constants");
const OrderModel = require("../order/order.model");
const TransactionModel = require("./transaction.model");

class TransactionController {
  addPayment = async (req, res, next) => {
    try {
        const loggedInUser = req.loggedInUser;
        const order = await OrderModel.findOne({
            code: req.params.orderCode
        })

        if(!order){
            throw{
                code: 422,
                message: "Order not found",
                name: "ORDER_NOT_FOUND",
                options: null,
            }
        }
        const transaction = new TransactionModel({
            paidBy: loggedInUser._id,
            order: order._id,
            refCode: req.body.transaction_id,
            amount: req.body.amount,
            data: JSON.stringify(req.body)
        })
        await transaction.save()

        order.status = OrderDetailStatus.PAID,
        order.save()

        res.json({
            data: transaction,
            message: "Your payment for the order has been received!!!",
            status: "PAYMENT_RECEIVED",
            options: null,
        })
    } catch (exception) {
      next(exception);
    }
  };
}

const transactionCtrl = new TransactionController();
module.exports = transactionCtrl;
