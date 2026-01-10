import axios from "axios";
import { setUserState, clearUserState } from "../reduxStore/userSlice";
import { setAlertWithTimeOut } from "./alerts";

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

      console.log("Response Data: ", response);
      dispatch(
        setUserState({ token: response.data.token, email: email.current.value })
      );
    } catch (error) {
      console.error("Authentication Error: ", error);
      const errors = error.response?.data?.errors;
      if (errors) {
        dispatch(setAlertWithTimeOut(errors[0].msg, "danger"));
      }
    }
  };

export const logoutUser = () => (dispatch) => {
  dispatch(clearUserState());
};
