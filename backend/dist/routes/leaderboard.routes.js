"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Component_1 = require("../models/Component");
const router = (0, express_1.Router)();
// Leaderboard: users sorted by approved components count
router.get("/", async (req, res) => {
    try {
        const components = await Component_1.Component.find({ status: "approved" }).populate("authorId", "name email");
        const userMap = {};
        components.forEach((comp) => {
            const uId = comp.authorId?._id?.toString();
            if (!uId)
                return;
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.routes.js.map