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
      {!profileStore.isProfileLoaded ? (
        <Spinner />
      ) : (
        <div className="profiles_container">
          {profileStore.profiles.length > 0 ? (
            profileStore.profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h3> No Profiles Found...</h3>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Profiles;
