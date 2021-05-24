import React from "react";
import classes from "./Switch.module.css";

const switchBox = (props) => {
  return (
    <div className={classes.SwitchBox}>
      <h1 className={classes.Label}>
        {!props.symbolType ? `Do-Re-Mi-Fa-Sol-La-Si` : `A-B-C-D-E-F-G`}
      </h1>
      <label className={classes.Switch}>
        <input
          checked={props.symbolType}
          onChange={props.handler}
          type="checkbox"
        />
        <span className={classes.Slider}></span>
      </label>
    </div>
  );
};

export default switchBox;
