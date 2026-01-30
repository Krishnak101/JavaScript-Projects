import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import User from "../../models/User.js";
import auth from "../../middleware/auth.js";
import { check, validationResult } from "express-validator";
const router = express.Router();

// @route    POST api/users
// @desc     Create a new user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with minimum of 7 characters"
    ).isLength({ min: 7 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // implies user doesnt exist and we need to create one
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({ name, email, avatar, password });
      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // save user to mongo db
      await user.save();

      //create a jwt token for caching and authentication
      const payload = {
        user_id: user.id,
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/users/imageUpload
// @desc     Upload User's Image
// @access   Private
router.post(
  "/imageUpload",
  [
    auth,
    [
      check("profile_image_url", "URL is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      profile_image_url,
    } = req.body;
        //update the existing user's avatar

         await User.findByIdAndUpdate(req.user_id, {avatar: profile_image_url}, { new: true });
        return res.json({ msg: "User Avatar Updated" });
  },
);

export default router;
