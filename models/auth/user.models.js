import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    index: true,
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
    required: [true, "Password is required"],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Contact number can not be more than 20 digits"],
    trim: true,
  },
});

//  Registration of the User Model(userShema) with name 'User'
export const User = model("User", userSchema);
