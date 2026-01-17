import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../utils/actions/profile";
import Spinner from "../Home/Spinner";
import ProfileItem from "./ProfileItem";
import "./Profiles.css";
import { setAlertWithTimeOut } from "./../utils/actions/alerts";
import Pagination from "../Routing/Pagination";

const Profiles = () => {
  const dispatch = useDispatch();
  const profileStore = useSelector((state) => state.profile);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const endIndex = currentPage * postsPerPage;
  const startIndex = endIndex - postsPerPage;
  let limitedProfiles = [];
  useEffect(() => {
    dispatch(getAllProfiles());
  }, []);
  if (!profileStore.isProfilesLoaded) {
    return <Spinner />;
  } else {
    limitedProfiles = profileStore.profiles?.slice(startIndex, endIndex);
  }
  return (
    <div className="profiles_top_container">
      <h1 className="text_header font-bold text-2xl">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and Connect with
        Developers
      </p>
      <div>
        {profileStore.profiles.length > 0 ? (
          <Fragment>
            {limitedProfiles.map((profile, index) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
            <Pagination
              totalPosts={profileStore.profiles.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Fragment>
        ) : (
          <h3> No Profiles Found...</h3>
        )}
      </div>
    </div>
  );
};

export default Profiles;
