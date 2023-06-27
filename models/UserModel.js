import mongoose, { Schema, Types } from "mongoose";
import isEmail from "validator/lib/isemail.js";

const UserModel = mongoose.model(
  "User",
  new Schema({
    id: { type: Types.ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: "Email is incorrect format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  })
);

export default UserModel;
