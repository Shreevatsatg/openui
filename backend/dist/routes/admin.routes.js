"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Component_1 = require("../models/Component");
const User_1 = require("../models/User");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
function serializeSubmission(sub) {
    const author = sub.authorId && typeof sub.authorId === "object" && sub.authorId !== null && "name" in sub.authorId
        ? String(sub.authorId.name ?? "Unknown")
        : "Unknown";
    const createdAt = sub.createdAt instanceof Date ? sub.createdAt.toISOString() : new Date(sub.createdAt).toISOString();
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
function serializeUser(u) {
    const createdAt = u.createdAt instanceof Date ? u.createdAt.toISOString() : new Date(u.createdAt).toISOString();
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
router.get("/dashboard", auth_middleware_1.protect, auth_middleware_1.admin, async (req, res) => {
    try {
        const [pendingCount, approvedCount, usersCount, pendingRaw, approvedRaw, rejectedRaw, allUsersRaw] = await Promise.all([
            Component_1.Component.countDocuments({ status: "pending" }),
            Component_1.Component.countDocuments({ status: "approved" }),
            User_1.User.countDocuments(),
            Component_1.Component.find({ status: "pending" })
                .populate("authorId", "name email")
                .sort({ createdAt: -1 })
                .lean(),
            Component_1.Component.find({ status: "approved" })
                .populate("authorId", "name email")
                .sort({ createdAt: -1 })
                .lean(),
            Component_1.Component.find({ status: "rejected" })
                .populate("authorId", "name email")
                .sort({ createdAt: -1 })
                .lean(),
            User_1.User.find({}).sort({ createdAt: -1 }).lean(),
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.get("/pending", auth_middleware_1.protect, auth_middleware_1.admin, async (req, res) => {
    try {
        const components = await Component_1.Component.find({ status: "pending" }).populate("authorId", "name email");
        res.json(components);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// Next.js–compatible: POST /api/admin/approve { id }
router.post("/approve", auth_middleware_1.protect, auth_middleware_1.admin, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: "Component ID required" });
            return;
        }
        const component = await Component_1.Component.findByIdAndUpdate(id, { status: "approved" }, { new: true });
        if (!component) {
            res.status(404).json({ message: "Component not found" });
            return;
        }
        res.status(200).json({ message: "Component approved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to approve component" });
    }
});
// Next.js–compatible: POST /api/admin/reject { id }
router.post("/reject", auth_middleware_1.protect, auth_middleware_1.admin, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: "Component ID required" });
            return;
        }
        const component = await Component_1.Component.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
        if (!component) {
            res.status(404).json({ message: "Component not found" });
            return;
        }
        res.status(200).json({ message: "Component rejected successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to reject component" });
    }
});
// Legacy: PUT body { status: "approved" | "rejected" }
router.put("/approve/:id", auth_middleware_1.protect, auth_middleware_1.admin, async (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !["approved", "rejected"].includes(status)) {
            res.status(400).json({ message: "Invalid status" });
            return;
        }
        const component = await Component_1.Component.findById(req.params.id);
        if (component) {
            component.status = status;
            await component.save();
            res.json(component);
        }
        else {
            res.status(404).json({ message: "Component not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
//# sourceMappingURL=admin.routes.js.map