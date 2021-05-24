import React from "react";
import classes from "../../Auth.module.css";

const activeUser = (props) => (
  <div className={classes.Messages}>
    <p>
      You are currently logged in...
      {
        <button className={classes.Link} onClick={props.handler}>
          Logout
        </button>
      }
    </p>
  </div>
);

export default activeUser;
