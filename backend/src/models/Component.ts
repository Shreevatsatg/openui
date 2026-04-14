import mongoose, { Schema, Document } from "mongoose";

export interface IComponent extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  code: string;
  previewImage?: string;
  authorId: mongoose.Types.ObjectId;
  tags: string[];
  themeSupport: "both" | "light" | "dark";
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const ComponentSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true },
  previewImage: { type: String },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tags: { type: [String], default: [] },
  themeSupport: { type: String, enum: ["both", "light", "dark"], default: "both" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Component = mongoose.models.Component || mongoose.model<IComponent>("Component", ComponentSchema);
