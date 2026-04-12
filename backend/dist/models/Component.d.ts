import mongoose, { Document } from "mongoose";
export interface IComponent extends Document {
    title: string;
    slug: string;
    description: string;
    category: string;
    code: string;
    previewImage?: string;
    authorId: mongoose.Types.ObjectId;
    tags: string[];
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
}
export declare const Component: mongoose.Model<any, {}, {}, {}, any, any, any>;
//# sourceMappingURL=Component.d.ts.map