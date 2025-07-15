const mongoose = require("mongoose");
const { UserRoles } = require("../../config/constants");
const { Status, Gender } = require("../../config/constants"); // Importing Status from constants

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles), // Using UserRoles from constants
      default: UserRoles.CUSTOMER, // Default role is customer
      required: true,
    },
    address: {
      shipping: String,
      billing: String,
    },
    phone: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.OTHER,
    },
    image: {
      publicId: String,
      publicUrl: String,
      thumbUrl: String, // Thumbnail URL for the image
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE, // Default status is active
      required: true,
    },
    activationToken: String, // Token for account activation
    forgotPasswordToken: String, // Token for password reset
    expiryTime: Date, // Expiry time for activation or password reset tokens
  },
  {
    autoCreate: true, // Automatically create the collection if it doesn't exist
    autoIndex: true, // Automatically create indexes defined in the schema
    timestamps: true,
  } // Enabling timestamps to automatically manage createdAt and updatedAt fields
);

const UserModel = mongoose.model("User", UserSchema); // Creating a User model from the schema

module.exports = UserModel;
