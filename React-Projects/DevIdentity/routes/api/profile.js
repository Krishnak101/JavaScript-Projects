import express from "express";
import auth from "../../middleware/auth.js";
import Profile from "../../models/Profile.js";
import { check, validationResult } from "express-validator";
const router = express.Router();

// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user_id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user's profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("role", "Role is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      role,
      company,
      website,
      location,
      skills,
      bio,
      github_username,
      twitter,
      linkedin,
      facebook,
      youtube,
      instagram,
    } = req.body;
    // Building the profile object
    const profileFields = {};
    profileFields.user = req.user_id;
    if (role) profileFields.role = role;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (github_username) profileFields.github_username = github_username;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;

    console.log(profileFields);

    try {
      let profile = await Profile.findOne({ user: req.user_id });
      if (profile) {
        //update the existing profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user_id },
          { $set: profileFields },
          { new: true }
        );
      } else {
        //create a new profile
        profile = new Profile(profileFields);
        await profile.save();
      }
      return res.json(profile);
    } catch (err) {
      console.error(`error is : ${err.message}`);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile/all
// @desc     Get all Profiles
// @access   Public
router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get Profile by User ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
