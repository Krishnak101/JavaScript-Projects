import express from "express";
import auth from "../../middleware/auth.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import { check, validationResult } from "express-validator";
const router = express.Router();

// @route    Post api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [auth, [check("text", "Comment is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user_id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user_id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/:post_id
// @desc     Get all posts
// @access   Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:post_id
// @desc     Delete a post
// @access   Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.post_id,
      user: req.user_id,
    });

    if (!post) {
      return res
        .status(404)
        .json({ msg: "Post not found or user not authorized" });
    }
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

export default router;
