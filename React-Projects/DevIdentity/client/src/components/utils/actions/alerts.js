import { setAlert, clearAlert } from "../reduxStore/alertSlice";

export const setAlertWithTimeOut =
  (alertData, alertType, timeout = 5000) =>
  (dispatch) => {
    dispatch(setAlert({ msg: alertData, alertType: alertType }));
    //clear alert after timeout with default timer of 5 seconds
    setTimeout(() => {
      dispatch(clearAlert());
    }, timeout);
  };
