import { setAlert, clearAlert } from "../reduxStore/alertSlice";

export const setAlertWithTimeOut =
  (alertData, alertType, timeout = 6000) =>
  (dispatch) => {
    dispatch(setAlert({ msg: alertData, alertType: alertType }));
    //clear alert after timeout with default 6 seconds
    setTimeout(() => {
      dispatch(clearAlert());
    }, timeout);
  };
