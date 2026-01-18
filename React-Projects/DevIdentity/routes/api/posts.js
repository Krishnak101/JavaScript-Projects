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
        user_id: req.user_id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
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

// @route    PUT api/posts/like/:post_id
// @desc     Like a post
// @access   Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user_id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user_id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:post_id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user_id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user_id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:post_id
// @desc     comment on a post
// @access   Private
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user_id).select("-password");

      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user_id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  },
);

// @route    DELETE api/posts/comment/:post_id/:comment_id
// @desc     Delete comment on a post
// @access   Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user_id).select("-password");

    const post = await Post.findById(req.params.post_id);

    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);
    if (removeIndex === -1) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // only logged in user can delete their comment or post owner can delete any comment on their post
    if (
      post.comments[removeIndex].user.toString() !== req.user_id ||
      post.user.toString() !== req.user_id
    ) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

export default router;
