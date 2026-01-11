import React, { useRef, useState } from "react";
import "./CreateProfile.css";
const CreateProfile = () => {
  const [showSocials, setShowSocials] = useState(false);

  const toggleSocials = () => {
    setShowSocials(!showSocials);
  };

  const statusRef = useRef(null);
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
    const profileData = {
      status: statusRef.current.value,
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
    console.log(profileData);
    // Here you can dispatch an action or make an API call to save the profile data
  };
  return (
    <div className="register_form_container">
      <h1 className=" text-3xl font-bold ">Create Your Profile</h1>

      <form className="register_form " onSubmit={(e) => onFormSubmit(e)}>
        <small>* = required field</small>
        <select
          ref={statusRef}
          name="status"
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
        <input
          ref={companyRef}
          type="text"
          name="company"
          placeholder="Company"
          className="p-2 m-2"
        />
        <input
          ref={websiteRef}
          type="text"
          name="website"
          placeholder="Website Link"
          className="p-2 m-2"
        />
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
        <textarea
          ref={bioRef}
          name="bio"
          placeholder="A short bio of yourself"
          className="w-70 h-24 p-2 m-2"
        ></textarea>
        <div>
          <button
            type="button"
            onClick={toggleSocials}
            className="bg-red-500 rounded hover:bg-red-700 transition show_socials_btn"
          >
            &nbsp;&nbsp;Include Social Network Links&nbsp;&nbsp;
          </button>{" "}
          &nbsp;
          <small>(Optional)</small>
        </div>
        {showSocials && (
          <>
            <input
              ref={twitterRef}
              type="text"
              name="twitter"
              placeholder="Twitter"
              className="p-2 m-2"
            />
            <input
              ref={linkedinRef}
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              className="p-2 m-2"
            />
            <input
              ref={youtubeRef}
              type="text"
              name="youtube"
              placeholder="YouTube"
              className="p-2 m-2"
            />
          </>
        )}
        <div>
          <button type="submit" className="submit_btn bg-blue-700 font-bold">
            &nbsp;&nbsp;Submit&nbsp;&nbsp;
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
