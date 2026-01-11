import React, { Fragment } from "react";
import spinner from "../../assets/spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
        borderRadius: "50%",
      }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
