import axios from "axios";
import { setAlertWithTimeOut } from "./alerts";
import {
  setProfiles,
  setProfile,
  clearProfile,
  setRepos,
  setIsProfileLoaded,
} from "../reduxStore/profileSlice";

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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
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
