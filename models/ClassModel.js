import mongoose, { Schema, Types } from "mongoose";

const ClassModel = mongoose.model(
  "Class",
  new Schema({
    id: { type: Types.ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Class's name must be at least 4 characters",
      },
    },
  })
);

export default ClassModel;
