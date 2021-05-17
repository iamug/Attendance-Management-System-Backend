"use strict";
    import { mongoose, Schema, Document } from "Elucidate/Database/NoSQLModel";

    export interface UserInterface extends Document {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    }
    
    const UserSchema: Schema = new Schema({
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });
    
    const User = mongoose.model<UserInterface>("User", UserSchema);
    export default User;