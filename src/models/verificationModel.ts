import mongoose, { Document, Schema } from "mongoose";

interface IVerification extends Document {
  userId: mongoose.Types.ObjectId; // Changed to ObjectId
  hash: string;
  code: string;
  verified: boolean;
}

const verificationSchema = new Schema<IVerification>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  hash: { type: String, required: true },
  code: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

const VerificationModel = mongoose.model<IVerification>("Verification", verificationSchema, 'verify-ts');
export default VerificationModel;
