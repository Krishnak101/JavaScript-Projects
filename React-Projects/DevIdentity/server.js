import express from "express";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

//initializing middleware for json body parsing capability
app.use(express.json({ extended: false }));

//Sanitize data
// app.use(mongoSanitize());

//Set security headers and allow Cloudinary images
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      // 1. Allow FontAwesome scripts
      "script-src": [
        "'self'",
        "https://kit.fontawesome.com",
        "https://ka-f.fontawesome.com",
      ],
      // 2. Allow Cloudinary AND Gravatar images
      "img-src": [
        "'self'",
        "data:",
        "https://res.cloudinary.com",
        "https://www.gravatar.com",
      ],
      // 3. FontAwesome often needs connect-src for icons to load
      "connect-src": ["'self'", "https://ka-f.fontawesome.com"],
    },
  }),
);

//Prevent XSS Attacks
// app.use(xss());

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define routes
app.use("/api/users", (await import("./routes/api/users.js")).default);
app.use("/api/auth", (await import("./routes/api/auth.js")).default);
app.use("/api/profile", (await import("./routes/api/profile.js")).default);
app.use("/api/posts", (await import("./routes/api/posts.js")).default);

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
