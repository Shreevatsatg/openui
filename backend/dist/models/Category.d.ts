import mongoose, { Document } from "mongoose";
export interface ICategory extends Document {
    name: string;
    slug: string;
}
export declare const Category: mongoose.Model<any, {}, {}, {}, any, any, any>;
//# sourceMappingURL=Category.d.ts.map