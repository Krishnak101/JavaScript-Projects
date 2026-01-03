import express from "express";
import connectDB from "./config/db.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API running "));

//define routes
app.use("/api/users", (await import("./routes/api/users.js")).default);
app.use("/api/auth", (await import("./routes/api/auth.js")).default);
app.use("/api/profile", (await import("./routes/api/profile.js")).default);
app.use("/api/posts", (await import("./routes/api/posts.js")).default);


app.listen(PORT, () => console.log(`server started on port ${PORT}`));
