import mongoose from "mongoose";
import { now } from "./../node_modules/mongodb/src/utils";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: date.now,
  },
});

export default mongoose.model("user", UserSchema);
