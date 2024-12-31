import { Request, Response } from "express";
import VerificationModel from "../models/verificationModel";
import { generateHash } from "../utils/generateHash";
import UserModel from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Send verification code to the user's email
export const sendVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, phone } = req.body;

    // Validate input data
    if (!email || !phone) {
      res.status(400).json({ error: "Email and phone are required" });
      return;
    }

    // Find user by email and phone
    const user = await UserModel.findOne({ email, phone });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return; // Exit the function after sending the response
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Generate a unique hash using the code and UUID
    const hash = generateHash(code + uuidv4());

    // Save the verification details in the database
    const verification = new VerificationModel({
      userId: user._id,
      hash,
      code,
      verified: false, // Add a field for tracking verification status
    });

    await verification.save();

    // Set up email transport using environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // Example: Use Gmail SMTP server
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable for user email
        pass: process.env.EMAIL_PASS, // Use environment variable for user password (App Password)
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email from environment variable
      to: user.email, // Receiver email (user's email)
      subject: "Verification Code",
      text: `Your verification code is ${code}.`, // Body of the email
    };

    // Send the email with a promise-based approach for better error handling
    await transporter.sendMail(mailOptions);

    // Send the response with a success message and hash (for further use)
    res.status(200).json({ message: "Verification sent to email", hash });
  } catch (error) {
    console.error("Error sending verification:", error);
    res.status(500).json({ error: "Error sending verification" });
  }
};

// Verify the verification code logic
export const verifyCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, hash } = req.body;

    // Validate input data
    if (!code || !hash) {
      res.status(400).json({ error: "Code and hash are required" });
      return;
    }

    // Find the verification entry by hash
    const verification = await VerificationModel.findOne({ hash });
    if (!verification) {
      res.status(404).json({ error: "Verification not found" });
      return; // Exit the function after sending the response
    }

    // Check if the code matches
    if (verification.code !== code) {
      res.status(400).json({ error: "Invalid verification code" });
      return; // Exit the function after sending the response
    }

    // Update the verification status to true (this can be based on your application logic)
    verification.verified = true;
    await verification.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ error: "Error verifying code" });
  }
};
