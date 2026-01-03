import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";

// @route    POST api/users
// @desc     Create a user
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send("User create API is invoked");
  }
);

export default router;
