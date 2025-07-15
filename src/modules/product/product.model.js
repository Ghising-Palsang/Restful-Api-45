const mongoose = require('mongoose')
const { Status } = require('../../config/constants')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 2,
        max: 200,
        required:true,
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    price: {
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        min:0,
        max:90,
        default:0
    },
    afterDiscount:{
        type: Number,
        required: true,
    },
    description: String,
    brand:{
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null
    },
    isFeatured: Boolean,
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    status:{
        type: String,
        enum: Object.values(Status),
        default: Status.INACTIVE,
    },
    images:[{
        publicId:String,
        publicUrl:String,
        thumbUrl:String,
    }]
},{
    autoCreate: true, // Automatically create the collection if it doesn't exist
    autoIndex: true, // Automatically create indexes defined in the schema
    timestamps: true,
})

const ProductModel = mongoose.model('Product', ProductSchema)
module.exports = ProductModel;