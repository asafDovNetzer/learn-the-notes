import React from "react";
import classes from "./FormField.module.css";
import ReactTooltip from "react-tooltip";
import Aux from "../../hoc/Auxiliary";

const field = (props) => {
  const className = [classes.Field];

  if (props.field.validity) className.push(classes.Valid);
  if (props.field.validity === false) className.push(classes.InValid);

  return (
    <Aux>
      <input
        onChange={props.handler}
        className={className.join(` `)}
        placeholder={props.field.placeholder}
        name={props.name}
        required
        type={props.field.type}
        value={props.field.value}
        data-tip={props.field.info}
      />
      <ReactTooltip />
    </Aux>
  );
};

export default field;
