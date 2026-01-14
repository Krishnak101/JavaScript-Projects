import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ExperienceTimeLine.css";
import {
  deleteExperienceOrEducation,
  getCurrentUserProfile,
} from "../utils/actions/profile";
import Spinner from "../Home/Spinner";

const ExperienceTimeline = () => {
  const profileStore = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, []);
  if (!profileStore.isProfileLoaded) {
    return <Spinner />;
  }
  const experience = profileStore.profile.experience || [];
  const education = profileStore.profile.education || [];

  // 2. Combine them and add a 'type' flag to distinguish them in the UI
  const combinedData = [
    ...experience.map((item) => ({ ...item, type: "experience" })),
    ...education.map((item) => ({ ...item, type: "education" })),
  ];

  // 3. Sort by 'from' date (Descending: Newest first)
  const sortedTimeline = combinedData.sort((a, b) => {
    return new Date(b.from) - new Date(a.from);
  });

  const deleteItem = (id, type) => {
    dispatch(deleteExperienceOrEducation(id, type));
  };

  if (sortedTimeline.length === 0) {
    return <p className="text-center text-gray-500">No history added yet.</p>;
  }

  return (
    <div className="experience_container relative">
      <h1 className="font-bold text-2xl">Experience & Education</h1>

      {/* Central Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

      <div className="space-y-12">
        {sortedTimeline.map((item, index) => (
          <div
            key={item._id}
            draggable
            className={`flex items-center justify-between w-full mb-8 ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            {/* 1. The Content Card */}
            <div
              className={`experience_card relative w-5/12 p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow timeline-card ${
                item.type === "education"
                  ? "border-blue-200"
                  : "border-pink-200"
              }`}
            >
              {/*Adding a small badge for Type to higlight */}
              <span
                className={`text-[10px] uppercase font-bold px-2 py-1 inline-block ${
                  item.type === "education"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-pink-50 text-pink-600"
                }`}
              >
                {item.type}
              </span>

              <h3 className="font-bold text-xl text-gray-800">
                {item.title || item.degree}
              </h3>
              <div>
                <p className="text-pink-600 font-semibold mb-2">
                  {item.company || item.school} {" ["}{" "}
                  <small>{item.location || item.fieldofstudy}</small> {" ]"}
                </p>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p className="italic">
                  {months[new Date(item.from).getMonth()]}{" "}
                  {new Date(item.from).getFullYear()} -{" "}
                  {item.to
                    ? `${months[new Date(item.to).getMonth()]} ${new Date(
                        item.to
                      ).getFullYear()}`
                    : "Present"}
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {item.description}
                </p>
                <i
                  className="delete_icon fa-solid fa-trash"
                  onClick={() => deleteItem(item._id, item.type)}
                ></i>
              </div>
            </div>

            {/* 2. The Timeline Year Node */}
            <div
              className={`z-10 flex items-center justify-center w-14 h-14 bg-white border-2 rounded-full shadow-sm text-gray-500 font-bold text-sm ${
                item.type === "education"
                  ? "border-blue-200"
                  : "border-pink-200"
              }`}
            >
              {new Date(item.from).getFullYear()}
            </div>

            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
