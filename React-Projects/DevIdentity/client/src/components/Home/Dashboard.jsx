import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../utils/actions/profile";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import "../Profiles/Profile.css";
import Skills from "../Profile/Skills";
import ExperienceTimeline from "../Profile/ExperienceTimeLine";
import ProfileGithub from "../Profile/ProfileGithub";

const Dashboard = () => {
  const currentProfileStore = useSelector((state) => state.profile);
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUserProfile());
    }
  }, []);
  return token && !currentProfileStore.isProfileLoaded ? (
    <Spinner />
  ) : (
    <div className="dashboard_top">
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user?.name}
      </p>
      {currentProfileStore.profile === null ? (
        <Fragment>
          <p>You haven't setup your profile yet. Please add some info</p>
          <Link
            to="/create-profile"
            className="create_profile_link btn btn-primary my-1"
          >
            <i className="fa-solid fa-pen-to-square"></i> &nbsp;Create Profile
          </Link>
        </Fragment>
      ) : (
        <div>
          <div className="profile_actions">
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
          <Skills skills={currentProfileStore.profile.skills} />
          <ExperienceTimeline
            experience={currentProfileStore.profile.experience}
            education={currentProfileStore.profile.education}
            token={token}
          />
          <ProfileGithub
            github_username={currentProfileStore.profile?.github_username}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
