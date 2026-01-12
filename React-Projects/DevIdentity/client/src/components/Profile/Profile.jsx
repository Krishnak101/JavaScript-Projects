import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
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
    </div>
  );
};

export default Profile;
