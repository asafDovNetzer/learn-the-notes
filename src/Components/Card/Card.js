import React from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./Card.module.css";
import Aux from "../../hoc/Auxiliary";

const card = (props) => {
  const className = [classes.Card, props.time < 0.4 ? classes.Close : null];

  let card = (
    <button onClick={props.handler}>
      <svg width="160" height="160" fill="currentColor">
        <use href={`${icons}#play`} />
      </svg>
    </button>
  );

  if (props.isRunning) {
    card = <img src={`./Images/${props.note.fileName}.jpg`} alt="something" />;
  }

  let success = null;

  if (props.note.noteName === props.answer) {
    success = <h1 className={classes.Success}>✔</h1>;
  }

  const massageDiv =
    props.note.valuesArray.length === 0 ? (
      <div
        className={
          props.time < 4 && props.time !== 0 ? classes.First : classes.None
        }
      >
        <h1>NEW NOTE !</h1>
      </div>
    ) : null;

  const nextCard = `./Images/${props.nextNote}.jpg`;

  return (
    <Aux>
      {massageDiv}
      <div className={className.join(` `)}>
        {card}
        {success}
        <img className={classes.NextCard} src={nextCard} alt="something" />
      </div>
    </Aux>
  );
};

export default card;
