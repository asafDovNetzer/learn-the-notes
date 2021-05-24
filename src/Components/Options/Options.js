import React from "react";
import Option from "./Option/Option";
import classes from "./Options.module.css";

const options = (props) => {
  const optionsArray = [];

  if (window.outerWidth < 500) {
    props.options.forEach((option, index) => {
      optionsArray.unshift(
        <Option
          index={index}
          key={option.name}
          disabled={option.isDisabled}
          symbolType={props.symbolType}
          note={option.name}
          symbol={option.symbol}
          handler={(Option) => props.handler(Option)}
        />
      );
    });
  }

  if (window.outerWidth >= 500) {
    props.options.forEach((option, index) => {
      optionsArray.push(
        <Option
          index={index}
          key={option.name}
          disabled={option.isDisabled}
          symbolType={props.symbolType}
          note={option.name}
          symbol={option.symbol}
          handler={(Option) => props.handler(Option)}
        />
      );
    });
  }

  const className = [classes.Options, props.isRunning ? null : classes.Hidden];

  return (
    <div className={className.join(` `)}>
      {optionsArray.map((option) => option)}
    </div>
  );
};

export default options;
