import React from "react";
import classes from "./Spinner.css";

const Spinner = (props) => {
  return (
    <div style={{ padding: "100px" }}>
      <div className={classes.Loader}> Loading...</div>
    </div>
  );
};

export default Spinner;
