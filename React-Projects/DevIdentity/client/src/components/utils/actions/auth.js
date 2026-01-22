import axios from "axios";
import {
  setUserState,
  clearUserState,
  setUserData,
} from "../reduxStore/userSlice";
import { setAlertWithTimeOut } from "./alerts";
import { setAuthToken } from "../helper.js";

export const handleUserAuth =
  (isLogInForm, username, email, password) => async (dispatch) => {
    const apiEndpoint = isLogInForm ? "/api/auth" : "/api/users";
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = isLogInForm
        ? JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          })
        : JSON.stringify({
            name: username.current.value,
            email: email.current.value,
            password: password.current.value,
          });
      const response = await axios.post(apiEndpoint, body, config);

      const token = response.data.token;
      // Set token in axios headers for future requests
      setAuthToken(token);
      // Fetch user data after authentication
      dispatch(setUserState({ token: token, email: email.current.value }));
      dispatch(
        setAlertWithTimeOut(
          isLogInForm ? "Login Successful" : "Registration Successful",
          "success"
        )
      );
      dispatch(fetchUserData());
    } catch (error) {
      const errors = error.response?.data?.errors;
      console.error("Error:: handleUserAuth() : ", error);
      dispatch(setAlertWithTimeOut(errors[0]?.msg, "danger"));
    }
  };

export const logoutUser = () => (dispatch) => {
  dispatch(clearUserState());
  dispatch(
    setAlertWithTimeOut("You have successfully Logged out...", "success")
  );
};

export const fetchUserData = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await axios.get("/api/auth");
      dispatch(setUserData(response.data));
    } catch (error) {
      console.error("Error:: fetchUserData() : ", error);
      if (error?.response?.data?.error === "jwt expired") {
        dispatch(logoutUser());
        dispatch(
          setAlertWithTimeOut(
            "Session Expired! Please Login again to continue...",
            "danger"
          )
        );
      } else {
        dispatch(setAlertWithTimeOut("Failed to fetch user data", "danger"));
      }
    }
  }
};
