const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    paidBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: "null"
    },
    order: {
        type:mongoose.Types.ObjectId,
        ref: "Order",
        required: true
    },
    refCode: {
        type: String,
        unique: true,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    data: String
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})

const TransactionModel = mongoose.model('Transaction', TransactionSchema)
module.exports = TransactionModel



