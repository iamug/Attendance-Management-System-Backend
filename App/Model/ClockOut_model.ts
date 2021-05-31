"use strict";
import { mongoose, Schema, Document } from "Elucidate/Database/NoSQLModel";
import User from "./User_model";

export interface ClockOutInterface extends Document {
  location: { long: number; lat: number };
  clockedOut: boolean;
  user?: string;
}

const ClockOutSchema: Schema = new Schema({
  location: { type: Object, required: true },
  clockedOut: { type: Boolean, required: true, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
});
ClockOutSchema.set("timestamps", true);

const ClockOut = mongoose.model<ClockOutInterface>("ClockOut", ClockOutSchema);
export default ClockOut;
