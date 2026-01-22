import express from "express";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from 'url';

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

//initializing middleware for json body parsing capability
app.use(express.json({ extended: false }));

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define routes
app.use("/api/users", (await import("./routes/api/users.js")).default);
app.use("/api/auth", (await import("./routes/api/auth.js")).default);
app.use("/api/profile", (await import("./routes/api/profile.js")).default);
app.use("/api/posts", (await import("./routes/api/posts.js")).default);

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
