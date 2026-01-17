import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos } from "../utils/actions/profile";

const ProfileGithub = ({ github_username }) => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.profile.repos);
  if (!github_username || github_username.trim().length == 0) {
    return null;
  }
  useEffect(() => {
    dispatch(getGithubRepos(github_username));
  }, []);
  return (
    <div>
      {repos.map((repo, index) => (
        <h1 key={index}>{repo.name}</h1>
      ))}
    </div>
  );
};

export default ProfileGithub;
