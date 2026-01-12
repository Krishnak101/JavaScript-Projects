import React, { use, useEffect, useRef, useState } from "react";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserProfile,
  setCurrentUserProfile,
} from "../utils/actions/profile";

const CreateProfile = ({ isEditPage }) => {
  const currentProfileStore = useSelector((state) => state.profile);
  const [showSocials, setShowSocials] = useState(false);

  const toggleSocials = () => {
    setShowSocials(!showSocials);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleRef = useRef(null);
  const companyRef = useRef(null);
  const websiteRef = useRef(null);
  const locationRef = useRef(null);
  const skillsRef = useRef(null);
  const githubUsernameRef = useRef(null);
  const bioRef = useRef(null);
  const twitterRef = useRef(null);
  const linkedinRef = useRef(null);
  const youtubeRef = useRef(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const profileFormData = {
      role: roleRef.current.value,
      company: companyRef.current.value,

      website: websiteRef.current.value,
      location: locationRef.current.value,
      skills: skillsRef.current.value,
      github_username: githubUsernameRef.current.value,

      bio: bioRef.current.value,

      twitter: twitterRef.current ? twitterRef.current.value : "",
      linkedin: linkedinRef.current ? linkedinRef.current.value : "",
      youtube: youtubeRef.current ? youtubeRef.current.value : "",
    };

    dispatch(setCurrentUserProfile(profileFormData, navigate, isEditPage));
  };

  const clearForm = () => {
    return navigate("/dashboard");
  };
  useEffect(() => {
    console.log(
      "CreateProfile :: useEffect :: currentProfileStore : ",
      currentProfileStore
    );

    if (!currentProfileStore.isProfileLoaded) {
      dispatch(getCurrentUserProfile());
    } else {
      //populate the form fields
      if (currentProfileStore.profile.social.length != 0 && !showSocials) {
        setShowSocials(true);
      }
      const {
        role,
        company,
        website,
        location,
        skills,
        github_username,
        bio,
        social,
      } = currentProfileStore.profile;
      roleRef.current.value = role || "";
      companyRef.current.value = company || "";
      websiteRef.current.value = website || "";
      locationRef.current.value = location || "";
      skillsRef.current.value = skills.join(",") || "";
      githubUsernameRef.current.value = github_username || "";
      bioRef.current.value = bio || "";
      if (showSocials) {
        twitterRef.current.value = social.twitter || "";
        linkedinRef.current.value = social.linkedin || "";
        youtubeRef.current.value = social.youtube || "";
      }
      console.log("CreateProfile :: useEffect :: profileData : ", social);
    }
  }, [showSocials, currentProfileStore.isProfileLoaded]);

  return (
    <div className="register_form_container">
      <h1 className=" text-3xl font-bold ">
        {isEditPage ? "Update " : "Create "} Your Profile
      </h1>

      <form className="register_form " onSubmit={(e) => onFormSubmit(e)}>
        <small>* = required field</small>
        <select
          ref={roleRef}
          name="role"
          defaultValue={""}
          className="bg-white text-black p-2 m-2"
          required
        >
          <option value="" disabled>
            * Select Professional Status
          </option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Cloud Architect">Cloud Architect</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor or Teacher">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
        <small>Give us an idea of where you are at in your career</small>
        <input
          ref={companyRef}
          type="text"
          name="company"
          placeholder="Company"
          className="p-2 m-2"
        />
        <small>Could be your own company or one you work for</small>
        <input
          ref={websiteRef}
          type="text"
          name="website"
          placeholder="Website Link"
          className="p-2 m-2"
        />
        <small>Could be your own or a company website</small>
        <input
          ref={locationRef}
          type="text"
          name="location"
          placeholder="Location"
          className="p-2 m-2"
        />
        <small>City, State (eg. Boston, MA)</small>
        <input
          ref={skillsRef}
          type="text"
          name="skills"
          placeholder="* Skills"
          className="p-2 m-2"
          required
        />
        <small>
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </small>
        <input
          ref={githubUsernameRef}
          type="text"
          name="github_username"
          placeholder="GitHub Username"
          className="p-2 m-2"
        />
        <small>
          If you want your latest repos to be shown, include your Github
          username
        </small>
        <textarea
          ref={bioRef}
          name="bio"
          placeholder="A short bio of yourself"
          className="w-70 h-24 p-2 m-2"
        ></textarea>
        <small>Tell us a little about yourself</small>
        {(!isEditPage || !showSocials) && (
          <div>
            <button
              type="button"
              onClick={toggleSocials}
              className="bg-red-600 rounded hover:bg-red-700 transition show_socials_btn"
            >
              &nbsp;&nbsp; {showSocials ? "Remove" : "Include"} Social Network
              Links&nbsp;&nbsp;
            </button>{" "}
            &nbsp;
            <small>(Optional)</small>
          </div>
        )}
        {showSocials && (
          <>
            <div className="socials">
              <i className="fab fa-twitter fa-2x" />
              <input
                ref={twitterRef}
                type="text"
                name="twitter"
                placeholder="Twitter"
                className="social_link p-2 m-2"
              />
            </div>
            <div className="socials">
              <i className="fab fa-linkedin fa-2x" />
              <input
                ref={linkedinRef}
                type="text"
                name="linkedin"
                placeholder="LinkedIn"
                className="social_link p-2 m-2"
              />
            </div>
            <div className="socials">
              <i className="fab fa-youtube fa-2x" />
              <input
                ref={youtubeRef}
                type="text"
                name="youtube"
                placeholder="YouTube"
                className="social_link p-2 m-2"
              />
            </div>
          </>
        )}
        <div className="form_btns">
          <button type="submit" className="submit_btn bg-blue-700 font-bold">
            &nbsp;&nbsp;Submit&nbsp;&nbsp;
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="cancel_btn bg-red-700 font-bold"
          >
            &nbsp;&nbsp;Cancel&nbsp;&nbsp;
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
