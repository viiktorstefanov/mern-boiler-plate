import { Request, Response } from "express";
import { User } from "../models/user.model";
import  bcrypt  from 'bcryptjs';
import { generateVerificationToken } from "./utils/generateVerificationToken";
import { generateToken } from "./utils/generateToken";
import { setCookieToken } from "./utils/setCookieToken";

const signUp = async (req: Request, res: Response) => {

  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours 
    });

    await user.save();

    const token = generateToken(user._id.toString());

    setCookieToken(res ,token);

    const { ...userData } = user.toObject();

    res.status(201).json({
        success: true,
        message: "User successfully registered.",
        user: {
            ...userData,
            password: undefined,
        }
    });

    console.log(`User ${req.body.email} successfully registered.`);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

export default {
  signUp,
};
