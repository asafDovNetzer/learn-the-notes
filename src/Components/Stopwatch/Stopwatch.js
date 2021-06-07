import React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import classes from "./Stopwatch.module.css";

const stopwatch = (props) => {
  const seconds = Math.floor(props.time).toString();
  // const minu = +((props.time - seconds) * 10);
  const className = [
    classes.Stopwatch,
    !props.isRunning && classes.Hidden,
    props.time > 20 && classes.Hidden,
  ];

  return (
    <div
      className={className.join(` `)}
      data-tip="Scroll up to pause game"
      data-delay-show="800"
      data-effect="solid"
    >
      <p>{seconds.padStart(2, "0")}</p>
      {/* <p>:</p>
      <p>{milliSeconds.toFixed(0).padEnd(2, "0")}</p> */}
      <ReactTooltip />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    time: state.cardGame.stopwatch,
    isRunning: state.cardGame.isRunning,
  };
};

export default connect(mapStateToProps)(stopwatch);
