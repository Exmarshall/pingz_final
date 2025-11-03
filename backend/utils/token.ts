import jwt from "jsonwebtoken";
import type { UserProps } from "../types.js";

export const generateToken = (user: UserProps) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in your .env file");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d", // token expires in 7 days
  });
};
