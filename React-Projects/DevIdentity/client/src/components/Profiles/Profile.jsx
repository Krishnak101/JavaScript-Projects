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
  useEffect(() => {
    dispatch(getProfileById(userId));
  }, []);
  return !isProfileLoaded ? (
    <Spinner />
  ) : (
    <div>
      
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
