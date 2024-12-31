import crypto from "crypto";

export const generateHash = (data: string) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};
