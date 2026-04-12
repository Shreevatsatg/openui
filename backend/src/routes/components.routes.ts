import { Router, Request, Response } from "express";
import { Component } from "../models/Component";
import { protect, admin, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

// Get all approved components
router.get("/", async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    let query: any = { status: "approved" };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const components = await Component.find(query).populate("authorId", "name email").sort({ createdAt: -1 });
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get user's own components
router.get("/me", protect, async (req: AuthRequest, res: Response) => {
  try {
    const components = await Component.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get component by ID
router.get("/id/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const component = await Component.findById(req.params.id).populate("authorId", "name email");
    if (component) {
      res.json(component);
    } else {
      res.status(404).json({ message: "Component not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get component by slug
router.get("/:slug", async (req: Request, res: Response): Promise<void> => {
  try {
    const component = await Component.findOne({ slug: req.params.slug, status: "approved" }).populate("authorId", "name email");
    if (component) {
      res.json(component);
    } else {
      res.status(404).json({ message: "Component not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Submit a new component (protected)
router.post("/", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, slug, description, category, code, tags } = req.body;
    const component = await Component.create({
      title,
      slug,
      description,
      category,
      code,
      tags,
      authorId: req.user._id,
      status: req.user.role === "admin" ? "approved" : "pending",
    });
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Edit component
router.put("/:id", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }
    // Allow if user is author or admin
    if (component.authorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403).json({ message: "Not authorized to edit this component" });
      return;
    }

    const { title, slug, description, category, code, tags } = req.body;
    component.title = title || component.title;
    component.slug = slug || component.slug;
    component.description = description || component.description;
    component.category = category || component.category;
    component.code = code || component.code;
    component.tags = tags || component.tags;
    
    // If edited by user, send back to pending unless admin
    if (req.user.role !== "admin") {
      component.status = "pending";
    }

    await component.save();
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
