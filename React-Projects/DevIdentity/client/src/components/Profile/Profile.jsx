import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import ExperienceTimeline from "./ExperienceTimeLine";
import Skills from "./Skills";

const Profile = () => {
  return (
    <div>
      <div className="profile_actions my-2">
        <Link to="/edit-profile">
          <i className="fas fa-user-circle  mr-1"></i>
          Edit Profile
        </Link>
        <Link to="/add-experience">
          <i className="fab fa-black-tie  mr-1"></i>
          Add Experience
        </Link>
        <Link to="/add-education">
          <i className="fas fa-graduation-cap  mr-1"></i>
          Add Education
        </Link>
        <Link to="/show-timeline">
          <i className="fas fa-graduation-cap  mr-1"></i>
          Show Experience
        </Link>
      </div>
      <Skills />
      <ExperienceTimeline />
    </div>
  );
};

export default Profile;
