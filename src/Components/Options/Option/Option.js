import React from "react";
import classes from "./Option.module.css";

const option = (props) => {
  const className = [classes.Button];

  switch (props.index) {
    case 0:
      className.push(classes.Button0);
      break;
    case 1:
      className.push(classes.Button1);
      break;
    case 2:
      className.push(classes.Button2);
      break;
    case 4:
      className.push(classes.Button4);
      break;
    case 5:
      className.push(classes.Button5);
      break;
    case 6:
      className.push(classes.Button6);
      break;
    default:
      break;
  }

  return (
    <button
      className={className.join(` `)}
      disabled={props.disabled}
      onClick={() => props.handler(props.note)}
    >
      {props.symbolType ? props.note : props.symbol}
    </button>
  );
};

export default option;
