const mongoose = require('mongoose')
const { Status } = require('../../config/constants')

const CategorySchema = new mongoose.Schema({
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
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    status:{
        type: String,
        enum: Object.values(Status),
        default: Status.INACTIVE,
    },
    isFeatured: Boolean,
    inMenu: Boolean,
    image:{
        publicId:String,
        publicUrl:String,
        thumbUrl:String,
    }
},{
    autoCreate: true, // Automatically create the collection if it doesn't exist
    autoIndex: true, // Automatically create indexes defined in the schema
    timestamps: true,
})

const CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel;