import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";

// SignUp Function:


export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { type, name, email, phone, password, cPassword } = req.body;

    // Check if passwords match
    if (password !== cPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new UserModel({ type, name, email, phone, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and user ID
    return res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Error registering user"});
  }
};

// SignIn Function
export const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { type, email, password } = req.body;

    // Find user by type and email
    const user = await UserModel.findOne({ type, email });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Respond with success message
    return res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({ error: "Error signing in"});
  }
};

// Logout Function
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Clear the authentication token or session here (depends on your strategy)
    // Example for clearing cookie:
    res.clearCookie("token"); // Adjust the cookie name as per your setup

    // Respond with success message
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Error during logout', error });
  }
};