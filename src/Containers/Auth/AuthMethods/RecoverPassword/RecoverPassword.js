import React from "react";
import FormField from "../../../../Components/FormField/FormField";
import classes from "../../Auth.module.css";

const recoverPassword = (props) => {
  console.log(props.field);
  const error = props.error ? <p>{props.error}</p> : null;
  const formValidity = props.field.validity;

  return (
    <div className={classes.AuthDiv}>
      <form>
        <ul>
          <FormField
            handler={props.fieldChangeHandler}
            field={props.field}
            name={props.field.type}
          />
        </ul>
        <button
          className={classes.Button}
          disabled={!formValidity}
          onClick={props.submitHandler}
        >
          Send Verification Email
        </button>
      </form>
      {error}
    </div>
  );
};

export default recoverPassword;
