import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";
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
    console.error(err);
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
        return res.json({ msg: "Profile Updated", Profile: profile });
      } else {
        //create a new profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.json({ msg: "Profile Created", Profile: profile });
      }
    } catch (err) {
      console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user_id });

    await User.findOneAndDelete({ _id: req.user_id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, company, location, from, to, current, description } =
        req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      const profile = await Profile.findOne({ user: req.user_id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete an experience from profile
// @access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user_id });
    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: "Experience not found" });
    }
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/education
// @desc     Add education info to Profile
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;

      const educationalData = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };

      const profile = await Profile.findOne({ user: req.user_id });
      profile.education.unshift(educationalData);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/education/:education_id
// @desc     Delete an education from profile
// @access   Private
router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user_id });
    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.education_id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: "Education not found" });
    }
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
