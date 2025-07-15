const mongoose = require('mongoose');
const { OrderDetailStatus } = require('../../config/constants');
const OrderModel = require('../order/order.model');




const OrderDetailSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order:{
        type: mongoose.Types.ObjectId,
        ref: "Order",
        default: null
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price:{
        type: Number,
        min: 1,
        required: true,
    },
    quantity:{
        type: Number,
        min: 1,
        required: true,
    },
    total:{
        type: Number,
        required: true
    },
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        enum: Object.values(OrderDetailStatus),
        default: OrderDetailStatus.PENDING,

    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex: true
})

const OrderDetailModel = mongoose.model('OrderDetail', OrderDetailSchema)
module.exports = OrderDetailModel;