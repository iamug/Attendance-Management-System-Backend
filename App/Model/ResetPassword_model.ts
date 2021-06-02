"use strict";
import { mongoose, Schema, Document } from "Elucidate/Database/NoSQLModel";

export interface PasswordInterface extends Document {
  email: string;
  hash: string;
  period: string;
}

const PasswordSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  period: { type: String, required: false },
  
});

PasswordSchema.set("timestamps", true);

const PasswordReset = mongoose.model<PasswordInterface>("PasswordReset", PasswordSchema);
export default PasswordReset;
