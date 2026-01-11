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
