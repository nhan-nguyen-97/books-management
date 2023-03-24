import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      default: "male",
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UsersModel = mongoose.model("User", schema);
