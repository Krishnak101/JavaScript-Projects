import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    console.log("Setting auth token in headers:", token);
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export { setAuthToken };
