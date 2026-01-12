import axios from "axios";
import { setAlertWithTimeOut } from "./alerts";
import {
  setProfiles,
  setProfile,
  clearProfile,
  setRepos,
  setIsProfileLoaded,
  setExperience,
} from "../reduxStore/profileSlice";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    console.log(
      "getCurrentUserProfile() :: Auth-Token in headers : ",
      axios.defaults.headers.common["x-auth-token"]
    );
    const response = await axios.get("/api/profile/me");
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error(
      "Error :: getCurrentUserProfile() : ",
      error.response.data.msg
    );
    dispatch(setIsProfileLoaded(true));
  }
};
export const getAllProfiles = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile");
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
          "success"
        )
      );
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response?.data?.errors;
      const errors_msg = errors.map((err) => err.msg).join(" | ");
      console.error("Error :: setCurrentUserProfile() : ", errors_msg);
      dispatch(setAlertWithTimeOut(errors_msg, "danger"));
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
      const errors_msg = errors.map((err) => err.msg).join(" | ");
      console.error("Error :: setCurrentUserExperience() : ", errors_msg);
      dispatch(setAlertWithTimeOut(errors_msg, "danger"));
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
      const errors_msg = errors.map((err) => err.msg).join(" | ");
      console.error("Error :: setCurrentUserEducation() : ", errors_msg);
      dispatch(setAlertWithTimeOut(errors_msg, "danger"));
    }
  };
