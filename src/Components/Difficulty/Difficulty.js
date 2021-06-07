import React from "react";
import classes from "./Difficulty.module.css";

const difficulty = (props) => {
  return (
    <div className={classes.Difficulty}>
      <button
        className={classes.DiffButton}
        onClick={() => props.chooseHandler(0.4)}
      >
        <h1>Beginner</h1>
        <p>I can recognize at least one note</p>
        <img src={`./Images/easym.jpg`} alt="something" />
      </button>
      <button
        className={classes.DiffButton}
        onClick={() => props.chooseHandler(0.2)}
      >
        <h1>Advanced Beginner</h1>
        <p>I recognize at least five notes on both clefs</p>
        <img src={`./Images/midm.jpg`} alt="something" />
      </button>
      <button
        className={classes.DiffButton}
        onClick={() => props.chooseHandler(0.1)}
      >
        <h1>Intermediate</h1>
        <p>I recognize almost every note on both clefs</p>
        <img src={`./Images/hardm.jpg`} alt="something" />
      </button>
      {/* <div className={classes.Skip}>
        <button onClick={() => props.chooseHandler(0.4)}>Skip</button>
      </div> */}
    </div>
  );
};

export default difficulty;
