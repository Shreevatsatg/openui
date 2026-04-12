import { Router, Response } from "express";
import { Component } from "../models/Component";
import { User } from "../models/User";
import { protect, admin, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

function serializeSubmission(sub: {
  _id: unknown;
  title: string;
  description: string;
  category: string;
  code: string;
  authorId?: unknown;
  createdAt: Date;
}) {
  const author =
    sub.authorId && typeof sub.authorId === "object" && sub.authorId !== null && "name" in sub.authorId
      ? String((sub.authorId as { name?: string }).name ?? "Unknown")
      : "Unknown";
  const createdAt =
    sub.createdAt instanceof Date ? sub.createdAt.toISOString() : new Date(sub.createdAt).toISOString();
  return {
    _id: String(sub._id),
    title: sub.title,
    description: sub.description,
    category: sub.category,
    code: sub.code,
    author,
    createdAt,
  };
}

function serializeUser(u: {
  _id: unknown;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  hasProfile?: boolean;
  onboarded?: boolean;
}) {
  const createdAt =
    u.createdAt instanceof Date ? u.createdAt.toISOString() : new Date(u.createdAt).toISOString();
  return {
    _id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt,
    hasProfile: u.hasProfile ?? false,
    onboarded: u.onboarded ?? false,
  };
}

// Get comprehensive admin stats (shape matches former Next.js admin page serialization)
router.get("/dashboard", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const [pendingCount, approvedCount, usersCount, pendingRaw, approvedRaw, rejectedRaw, allUsersRaw] =
      await Promise.all([
        Component.countDocuments({ status: "pending" }),
        Component.countDocuments({ status: "approved" }),
        User.countDocuments(),
        Component.find({ status: "pending" })
          .populate("authorId", "name email")
          .sort({ createdAt: -1 })
          .lean(),
        Component.find({ status: "approved" })
          .populate("authorId", "name email")
          .sort({ createdAt: -1 })
          .lean(),
        Component.find({ status: "rejected" })
          .populate("authorId", "name email")
          .sort({ createdAt: -1 })
          .lean(),
        User.find({}).sort({ createdAt: -1 }).lean(),
      ]);

    res.json({
      pendingCount,
      approvedCount,
      usersCount,
      pendingSubmissions: pendingRaw.map(serializeSubmission),
      approvedSubmissions: approvedRaw.map(serializeSubmission),
      rejectedSubmissions: rejectedRaw.map(serializeSubmission),
      allUsers: allUsersRaw.map(serializeUser),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/pending", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const components = await Component.find({ status: "pending" }).populate("authorId", "name email");
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Next.js–compatible: POST /api/admin/approve { id }
router.post("/approve", protect, admin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.body as { id?: string };
    if (!id) {
      res.status(400).json({ message: "Component ID required" });
      return;
    }
    const component = await Component.findByIdAndUpdate(id, { status: "approved" }, { new: true });
    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }
    res.status(200).json({ message: "Component approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve component" });
  }
});

// Next.js–compatible: POST /api/admin/reject { id }
router.post("/reject", protect, admin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.body as { id?: string };
    if (!id) {
      res.status(400).json({ message: "Component ID required" });
      return;
    }
    const component = await Component.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }
    res.status(200).json({ message: "Component rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject component" });
  }
});

// Legacy: PUT body { status: "approved" | "rejected" }
router.put("/approve/:id", protect, admin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body as { status?: string };
    if (!status || !["approved", "rejected"].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }
    const component = await Component.findById(req.params.id);
    if (component) {
      component.status = status as "approved" | "rejected";
      await component.save();
      res.json(component);
    } else {
      res.status(404).json({ message: "Component not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
