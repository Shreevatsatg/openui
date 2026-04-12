"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const components_routes_1 = __importDefault(require("./routes/components.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const leaderboard_routes_1 = __importDefault(require("./routes/leaderboard.routes"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/components", components_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/leaderboard", leaderboard_routes_1.default);
app.get("/", (req, res) => {
    res.send("OpenUI API is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map