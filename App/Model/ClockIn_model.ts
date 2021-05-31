"use strict";
import { mongoose, Schema, Document } from "Elucidate/Database/NoSQLModel";
import User from "./User_model";

export interface ClockInInterface extends Document {
  location: { long: number; lat: number };
  clockedIn: boolean;
  user?: string;
}

const ClockInSchema: Schema = new Schema({
  location: { type: Object, required: true },
  clockedIn: { type: Boolean, required: true, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

ClockInSchema.set("timestamps", true);

const ClockIn = mongoose.model<ClockInInterface>("ClockIn", ClockInSchema);
export default ClockIn;
