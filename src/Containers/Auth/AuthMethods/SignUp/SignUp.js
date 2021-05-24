import React from "react";
import classes from "../../Auth.module.css";
import FormField from "../../../../Components/FormField/FormField";

const signUp = (props) => {
  const error = props.error ? <p>{props.error}</p> : null;

  let formValidity = true;

  const inputlist = [];

  for (const key in props.fields) {
    if (!props.fields[key].validity) formValidity = false;

    inputlist.push(
      <FormField
        handler={props.fieldChangeHandler}
        key={key}
        field={props.fields[key]}
        name={key}
      />
    );
  }

  return (
    <div className={classes.AuthDiv}>
      <form>
        <ul>{inputlist.map((input) => input)}</ul>
        <button
          className={classes.Button}
          disabled={!formValidity}
          onClick={props.submitHandler}
        >
          Sign Up
        </button>
      </form>
      <div className={classes.Messages}>
        {error}
        <p>
          Already have an account?
          {
            <button
              className={classes.Link}
              onClick={() => props.changeMethodHandler(`Login`)}
            >
              Login
            </button>
          }
        </p>
      </div>
    </div>
  );
};

export default signUp;
