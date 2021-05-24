import React from "react";
import classes from "./DeleteButton.module.css";

const deleteButton = (props) => {
  return (
    <button
      className={[classes.Button, props.activated ? classes.Active : null].join(
        ` `
      )}
      onClick={props.handler}
    >
      {props.activated ? `You Sure?` : `Delete Memory`}
    </button>
  );
};

export default deleteButton;
