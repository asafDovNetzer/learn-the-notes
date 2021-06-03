import React from "react";
import Option from "./Option/Option";
import classes from "./Options.module.css";

const Options = React.memo((props) => {
  const optionsArray = [];

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
        rightAnswer={props.rightAnswer}
        answer={props.answer}
      />
    );
  });

  const className = [classes.Options, props.isRunning ? null : classes.Hidden];

  return (
    <div className={className.join(` `)}>
      {optionsArray.map((option) => option)}
    </div>
  );
});

export default Options;
