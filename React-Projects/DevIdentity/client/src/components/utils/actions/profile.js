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
    console.log("Fetching current user profile");
    console.log("Auth Token:", axios.defaults.headers.common["x-auth-token"]);
    const response = await axios.get("/api/profile/me");
    console.log("Current User Profile Data: ", response.data);
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error("Error fetching current user profile: ", error);
    dispatch(setIsProfileLoaded(true));
  }
};
export const getAllProfiles = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile");
    dispatch(setProfiles(response.data));
  } catch (error) {
    console.error("Error fetching all profiles: ", error);
    dispatch(setAlertWithTimeOut("Error fetching all profiles", "danger"));
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${userId}`);
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error("Error fetching profile by ID: ", error);
    dispatch(setAlertWithTimeOut("Error fetching profile by ID", "danger"));
  }
};
