import mongoose, { Schema, Types } from "mongoose";
import isEmail from "validator/lib/isemail.js";

const StudentModel = mongoose.model(
  "Student",
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
    language: {
      type: [String],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        messages: "{VALUE} is not supported",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber) => phoneNumber.length > 5,
        message: "Phone Number must be at least 3 characters",
      },
    },
    address: {
      type: String,
      required: false,
    },
  })
);

export default StudentModel;
