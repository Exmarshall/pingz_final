import type { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.ts";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, password } = req.body;
  try {
    //check if user exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ success: false, msg: "User already exists" });
      return;
    }

    //create new user

    user = new User({
      email,
      name,
      password,
      avatar: "",
    });

    //hash password

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //save user to db
    await user.save();

    // generate token
    const token = generateToken(user);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};



export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {

    //find user by email

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, msg: "Invalid credentials" });
      return;
    }
//compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, msg: "Invalid credentials" });
      return;
    }

    // generate token
    const token = generateToken(user);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
