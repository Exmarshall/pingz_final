import { Schema, model } from "mongoose";
import type { UserProps } from "../types.ts";


const UserSchema = new Schema<UserProps>(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<UserProps>("User", UserSchema);
