import React from "react";
import ReactTooltip from "react-tooltip";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./StorageIcon.module.css";
import Aux from "../../../hoc/Auxiliary";

const storageIcon = (props) => (
  <Aux>
    <svg
      className={props.storage ? classes.Saved : classes.Unsaved}
      width="26"
      height="26"
      fill="currentColor"
      data-tip={props.user ? "Auto-save is on" : `Login to enable auto-save`}
    >
      <use href={`${icons}#save`} />
    </svg>
    <ReactTooltip />
  </Aux>
);

export default storageIcon;
