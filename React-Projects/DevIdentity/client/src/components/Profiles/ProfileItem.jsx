import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile_item_container bg-light w-5/6">
      <div className="profile_pic_container">
        <img src={avatar} alt="" className="round_img rounded rounded-full" />
        <div className="profile_info">
          <h2 className="font-bold text-xl">{name}</h2>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className="location_p">{location && <span> {location}</span>}</p>
          <Link to={`/profile/user/${_id}`} className="profile_link">
            View Profile
          </Link>
        </div>
      </div>
      <ul className="hide-sm">
        {skills.slice(0, 5).map((skill, index) => (
          <li key={index} className="text-secondary">
            <i className="fas fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
      <div className="hide-sm"> </div>
    </div>
  );
};

export default ProfileItem;
