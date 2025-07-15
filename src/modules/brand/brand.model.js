const mongoose = require('mongoose')
const { Status } = require('../../config/constants')

const BrandSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 2,
        max: 50,
        required:true,
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    status:{
        type: String,
        enum: Object.values(Status),
        default: Status.INACTIVE,
    },
    logo:{
        publicId:String,
        publicUrl:String,
        thumbUrl:String,
    }
},{
    autoCreate: true, // Automatically create the collection if it doesn't exist
    autoIndex: true, // Automatically create indexes defined in the schema
    timestamps: true,
})

const BrandModel = mongoose.model('Brand', BrandSchema)
module.exports = BrandModel;