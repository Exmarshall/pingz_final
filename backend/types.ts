import { Document, Types } from "mongoose";

export interface UserProps extends Document {
  email: string;
  name: string;
  avatar?: string;
  password: string;
  createdAt: Date;
}

export interface ConversationProps extends Document {
  type: "private" | "group";
  name?: string;
  avatar?: string;
  participants: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
  lastMessage?: Types.ObjectId;
}
