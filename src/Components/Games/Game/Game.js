import React from "react";
import classes from "./Game.module.css";

const game = (props) => {
  const className = [classes.Game, props.index % 2 ? null : classes.Darker];

  const noteName = props.symbols ? props.game.name : props.game.symbol;

  return (
    <li className={className.join(` `)}>
      <p>{props.index + 1}.</p>
      <p>{noteName + ` ` + props.game.number}</p>
      <p>{props.game.clef}</p>
      <p>{`${props.game.time <= 20 ? props.game.time.toFixed(1) : `+20`} s`}</p>
      <p>{props.game.try}</p>
    </li>
  );
};

export default game;
