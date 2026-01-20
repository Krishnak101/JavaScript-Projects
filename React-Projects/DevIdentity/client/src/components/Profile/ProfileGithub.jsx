import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos } from "../utils/actions/profile";
import { Link } from "react-router-dom";
import "./ProfileGithub.css";

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
    <div className="skills_top_container bg-gray-700/40  border-2 border-gray-500/40 rounded-lg">
      {repos.length === 0 ? (
        <Fragment>
          <p className="text-center text-gray-500">Git Hub Repos Not found.</p>
        </Fragment>
      ) : (
        <div>
          <h2 className="text-white text-2xl font-bold">Github Repos</h2>
          {repos.map((repo, index) => (
            <div key={repo.id} className="text-white repo_text_container">
              <div className="repo_text_card">
                <h4 className="text-blue-400 font-bold">
                  <Link
                    to={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </Link>
                </h4>
                <small>{repo.description}</small>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <i className="fas fa-star"/>: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-light bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <i className="fas fa-eye"/>: {repo.watchers_count}
                  </li>
                  <li className="badge badge-dark bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <i className="fas fa-code-branch"/>: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileGithub;
