import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import ExperienceTimeline from "../Profile/ExperienceTimeLine";
import Skills from "../Profile/Skills";
import { getProfileById } from "../utils/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Home/Spinner";

const Profile = ({}) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { profile, isProfileLoaded } = useSelector((state) => state.profile);
  const { token, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfileById(userId));
  }, [userId]);

  if (!isProfileLoaded) {
    return <Spinner />;
  }
  if (!profile) {
    return <p className="text-center text-gray-500">No Profile Found.</p>;
  }
  return (
    <div className="profile_container">
      <Link to="/profiles" className="profile_link profile_link_red">
        Back to Profiles
      </Link>
      {user && user._id === userId && (
        <Link to="/edit-profile" className="profile_link">
          Edit Profile
        </Link>
      )}
      <h1>Hello {profile?.user.name}</h1>
      <Skills skills={profile.skills} />
      <ExperienceTimeline
        experience={profile?.experience}
        education={profile?.education}
      />
    </div>
  );
};

export default Profile;
