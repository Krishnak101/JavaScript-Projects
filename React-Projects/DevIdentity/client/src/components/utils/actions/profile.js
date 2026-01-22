import axios from "axios";
import { setAlertWithTimeOut } from "./alerts";
import {
  setProfiles,
  setProfile,
  clearProfile,
  setRepos,
  setIsProfileLoaded,
} from "../reduxStore/profileSlice";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me");
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error(
      "Error :: getCurrentUserProfile() : ",
      error.response.data.msg,
    );
    dispatch(clearProfile());
    dispatch(setIsProfileLoaded(true));
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/all");
    dispatch(clearProfile());
    dispatch(setProfiles(response.data));
  } catch (error) {
    console.error("Error :: getAllProfiles() : ", error);
    dispatch(setAlertWithTimeOut("Error fetching all profiles", "danger"));
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${userId}`);
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error("Error :: getProfileById() : ", error);
    const err_msg = error.response?.data?.msg;
    if (err_msg === "Profile not found") {
      dispatch(setIsProfileLoaded(true));
    }
    dispatch(setAlertWithTimeOut("Error fetching profile by ID", "danger"));
  }
};

export const setCurrentUserProfile =
  (formData, navigate, isEditPage = false) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
      const response = await axios.post("/api/profile", body, config);
      dispatch(setProfile(response.data.Profile));
      dispatch(
        setAlertWithTimeOut(
          isEditPage
            ? "Profile Updated Successfully"
            : "Profile Created Successfully",
          "success",
        ),
      );
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response?.data?.errors;
      console.error("Error :: setCurrentUserProfile() : ", error);
      dispatch(setAlertWithTimeOut(errors[0]?.msg, "danger"));
    }
  };

export const setCurrentUserExperience =
  (formData, navigate) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
      const response = await axios.put("/api/profile/experience", body, config);

      dispatch(setProfile(response.data));
      dispatch(setAlertWithTimeOut("Experience Added Successfully", "success"));
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response?.data?.errors;
      console.error("Error :: setCurrentUserExperience() : ", error);
      dispatch(setAlertWithTimeOut(errors[0]?.msg, "danger"));
    }
  };

export const setCurrentUserEducation =
  (formData, navigate) => async (dispatch) => {
    try {
      const body = JSON.stringify(formData);
      const response = await axios.put("/api/profile/education", body, config);

      dispatch(setProfile(response.data));
      dispatch(setAlertWithTimeOut("Education Added Successfully", "success"));
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response?.data?.errors;
      console.error("Error :: setCurrentUserEducation() : ", error);
      dispatch(setAlertWithTimeOut(errors[0]?.msg, "danger"));
    }
  };

export const deleteExperienceOrEducation = (id, type) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/${type}/${id}`);
    dispatch(setProfile(response.data));
    dispatch(
      setAlertWithTimeOut(
        `${type.toUpperCase()} Removed Successfully`,
        "success",
      ),
    );
  } catch (error) {
    console.error("Error :: deleteExperienceOrEducation() : ", error);
    dispatch(setAlertWithTimeOut(error.response?.data?.msg, "danger"));
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/github/${username}`);
    dispatch(setRepos(response.data));
  } catch (error) {
    console.error("Error :: getGithubRepos() : ", error);
    dispatch(
      setAlertWithTimeOut(`GitHub: ${error.response.statusText}`, "danger"),
    );
  }
};
