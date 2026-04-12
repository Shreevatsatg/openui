import mongoose, { Document } from "mongoose";
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
export declare const User: mongoose.Model<any, {}, {}, {}, any, any, any>;
//# sourceMappingURL=User.d.ts.map