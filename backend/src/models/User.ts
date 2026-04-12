import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  hasProfile: boolean;
  onboarded: boolean;
  profileData?: {
    bio?: string;
    avatar?: string;
    website?: string;
    github?: string;
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  hasProfile: { type: Boolean, default: false },
  onboarded: { type: Boolean, default: false },
  profileData: {
    bio: { type: String },
    avatar: { type: String },
    website: { type: String },
    github: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
