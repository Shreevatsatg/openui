"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth_middleware_1 = require("../middleware/auth.middleware");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "30d",
    });
};
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User_1.User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await User_1.User.create({
            name,
            email,
            password: hashedPassword,
            role: email.toLowerCase() === "admin@openui.com" ? "admin" : "user",
            hasProfile: false,
            onboarded: false,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                hasProfile: user.hasProfile,
                onboarded: user.onboarded,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (user && await bcryptjs_1.default.compare(password, user.password || "")) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                hasProfile: user.hasProfile,
                onboarded: user.onboarded,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.get("/me", auth_middleware_1.protect, async (req, res) => {
    res.json(req.user);
});
router.post("/profile", auth_middleware_1.protect, async (req, res) => {
    try {
        req.user.hasProfile = true;
        req.user.profileData = req.body;
        await req.user.save();
        res.json(req.user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.post("/onboard", auth_middleware_1.protect, async (req, res) => {
    try {
        req.user.onboarded = true;
        await req.user.save();
        res.json(req.user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map