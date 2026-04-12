import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { Component } from "../models/Component";

const router = Router();

// Leaderboard: users sorted by approved components count
router.get("/", async (req: Request, res: Response) => {
  try {
    const components = await Component.find({ status: "approved" }).populate("authorId", "name email");
    
    const userMap: Record<string, any> = {};
    
    components.forEach((comp: any) => {
      const uId = comp.authorId?._id?.toString();
      if (!uId) return;
      if (!userMap[uId]) {
        userMap[uId] = {
           _id: uId,
           name: comp.authorId.name,
           email: comp.authorId.email,
           componentsCount: 0
        };
      }
      userMap[uId].componentsCount++;
    });

    const leaderboard = Object.values(userMap).sort((a, b) => b.componentsCount - a.componentsCount);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
