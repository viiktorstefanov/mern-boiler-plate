import { Request, Response } from "express";
import { User } from "../models/user.model";
import  bcrypt  from 'bcryptjs';
import crypto from 'crypto';
import { generateVerificationToken } from "../utils/generateVerificationToken";
import { generateToken } from "../utils/generateToken";
import { setCookieToken } from "../utils/setCookieToken";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail";
import { sendResetSuccessEmail } from "../utils/sendResetSuccessEmail";
import { CustomRequest } from "../middlewares/verifyToken";

const HOST = process.env.HOST;

const signUp = async (req: Request, res: Response) => {
  
    //validation missing
  const { email, password, username } = req.body;
  
  try {
    if (!email || !password || !username) {
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
        username,
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
            verificationToken: undefined,
            verificationTokenExpiresAt: undefined,
            lastLogin: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            __v: undefined,
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

    
    console.log('Error in signup controller', error);
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully'});

  console.log(`User successfully logout.`);
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials'});
    };

    const token = generateToken(user._id.toString());
    setCookieToken(res ,token);

    user.lastLogin = new Date();
    await user.save();

    const { ...userData } = user.toObject();

    res.status(200).json({ 
      sucess: true,
      message: 'Logged in successfully',
      user: {
        ...userData,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
        lastLogin: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        __v: undefined,
      }
    });

    console.log(`User ${req.body.email} successfully login.`);

  } catch(error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }

    console.log('Error in login controller', error);
  }
};

const resetPassword = async (req: Request, res: Response) => {

  try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error: any) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const verifyEmail = async (req: Request, res: Response) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.username);

    const { ...userData } = user.toObject();

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...userData,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
        lastLogin: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        __v: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {

    const user = await User.findOne( { email });

    if(!user ) {
      return res.status(400).json({ success: false, message: 'User not found'});
    };

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(user.email, `${HOST}/reset-password/${resetToken}`);

    res.status(200).json( { sucess: true, message: 'Password reset link sent to your email' });

    console.log(`Password reset link sent to user with email: ${user.email}`);

  } catch(error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }

    console.log('Error in forgotPassword', error);
  }
};

const checkAuth = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;

    if(!userId) {
      return res.status(400).json({ success: false, message: "User not found" });
    };

    const user = await User.findById(userId).select("-password");

    if(!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    };

    res.status(200).json({ success: true, user });

  } catch (error: any) {
    console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
  }
}

export default {
  signUp,
  logout,
  signIn,
  verifyEmail,
  resetPassword,
  forgotPassword,
  checkAuth
};
