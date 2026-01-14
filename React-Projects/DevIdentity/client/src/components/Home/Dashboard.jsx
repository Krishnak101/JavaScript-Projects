import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../utils/actions/profile";
import Profile from "./../Profile/Profile";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const currentProfileStore = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user.user);
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
            <i class="fa-solid fa-pen-to-square"></i> &nbsp;Create Profile
          </Link>
        </Fragment>
      ) : (
        <Profile profile={currentProfileStore.profile} />
      )}
    </div>
  );
};

export default Dashboard;
