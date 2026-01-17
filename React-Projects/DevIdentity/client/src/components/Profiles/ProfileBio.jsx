import React from "react";
import { Link } from "react-router-dom";

const ProfileBio = ({
  profile: {
    role,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="bg-gray-500/40 backdrop-blur-md border-2 border-gray-500/40 rounded-lg p-10 text-center shadow-2xl profile_top">
      <img
        className="rounded-full round_img border-4 border-green-400 mx-auto"
        src={avatar}
        alt=""
      />
      <h1 className="text-white text-3xl font-bold mt-4">{name}</h1>
      <p className="text-gray-300">
        {role} {company && <span> at {company}</span>}
      </p>
      <p className="text-gray-400">{location && <span>{location}</span>}</p>
      <div className="icons">
        {website && (
          <Link to={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </Link>
        )}
        {social && social.twitter && (
          <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </Link>
        )}
        {social && social.linkedin && (
          <Link to={social.linkedin} target="_blank" rel="noopener noreferrer">
            <small className="fab fa-linkedin fa-2x" />
          </Link>
        )}
        {social && social.youtube && (
          <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
