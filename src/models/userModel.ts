import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User model
interface IUser extends Document {
  type: "male" | "female"; // Ensures that only "male" or "female" are valid types
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Define the user schema
const userSchema = new Schema<IUser>({
  type: { type: String, required: true, enum: ["male", "female"] }, // Restrict type to "male", "female"
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  phone: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Add timestamps to automatically include createdAt and updatedAt fields

// Create and export the model
const UserModel = mongoose.model<IUser>("User", userSchema, 'sign-in-up');
export default UserModel;
