import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { protect, AuthRequest } from "../middleware/auth.middleware";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
};

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
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
        token: generateToken(user._id as string),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password || "")) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasProfile: user.hasProfile,
        onboarded: user.onboarded,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/me", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  res.json(req.user);
});

router.post("/profile", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    req.user.hasProfile = true;
    req.user.profileData = req.body;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/onboard", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    req.user.onboarded = true;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
