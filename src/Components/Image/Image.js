import React from "react";
import classes from "./Image.module.css";

const img = (props) => {
  let img = (
    <img
      className={classes.Img}
      src={`./Images/${props.note?.fileName}.jpg`}
      alt="something"
    />
  );

  if (!props.note) {
    img = null;
  }
  return img;
};

export default img;
