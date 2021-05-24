import React from "react";
import classes from "../../Auth.module.css";
import FormField from "../../../../Components/FormField/FormField";

const login = (props) => {
  const error = props.error ? <p>{props.error}</p> : null;

  const formValidity = props.fields[0].validity && props.fields[1].validity;

  return (
    <div className={classes.AuthDiv}>
      <form>
        <ul>
          {props.fields.map((field) => (
            <FormField
              handler={props.fieldChangeHandler}
              key={field.name}
              field={field}
              name={field.name}
            />
          ))}
        </ul>
        <button
          className={classes.Button}
          disabled={!formValidity}
          onClick={props.submitHandler}
        >
          Login
        </button>
      </form>
      <div className={classes.Messages}>
        {error}
        <p>
          Don't have an account?
          {
            <button
              className={classes.Link}
              onClick={() => props.changeMethodHandler(`Sign Up`)}
            >
              Sign up for free
            </button>
          }
        </p>
        <p>
          Forgot your password?
          {
            <button
              className={classes.Link}
              onClick={() => props.changeMethodHandler(`Recover Password`)}
            >
              Recover it
            </button>
          }
        </p>
      </div>
    </div>
  );
};

export default login;
