"use strict";
import { mongoose, Schema, Document } from "Elucidate/Database/NoSQLModel";
import User from "./User_model";

// const geoSchema: Schema = new Schema({
//   type: { type: String, default: "Point" },
//   coordinates: {
//     type: [Number],
//     index: "2dsphere",
//   },
// });

export interface ClockInOutInterface extends Document {
  location: { long: number; lat: number };
  user?: string;
}

const ClockInOutSchema: Schema = new Schema({
  location: { type: Object, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

ClockInOutSchema.set("timestamps", true);

const ClockInOut = mongoose.model<ClockInOutInterface>(
  "ClockInOut",
  ClockInOutSchema
);
export default ClockInOut;
