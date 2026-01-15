import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../utils/actions/profile";
import Spinner from "../Home/Spinner";
import ProfileItem from "./ProfileItem";
import "./Profiles.css";

const Profiles = () => {
  const dispatch = useDispatch();
  const profileStore = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, []);
  return (
    <Fragment>
      {!profileStore.isProfilesLoaded ? (
        <Spinner />
      ) : (
        <div className="profiles_top_container">
          <h1 className="text_header font-bold text-2xl">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and Connect with
            Developers
          </p>
          <div>
            {profileStore.profiles.length > 0 ? (
              profileStore.profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h3> No Profiles Found...</h3>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profiles;
