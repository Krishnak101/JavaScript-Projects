import React from "react";
import "./Tag.css";

const Tag = ({ tagName, handleTag, selected }) => {
  const tagStyle = {
    HTML: { backgroundColor: "#f1811eff" },
    CSS: { backgroundColor: "#15d4c8" },
    JavaScript: { backgroundColor: "#f9f359ff" },
    React: { backgroundColor: "#39e271ff" },
    Default: { backgroundColor: "#dfdfdf" },
  };
  return (
    <button
      type="button"
      style={selected ? tagStyle[tagName] : tagStyle.Default}
      className="tag"
      onClick={() => handleTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
