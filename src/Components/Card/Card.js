import React from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./Card.module.css";

const card = (props) => {
  const className = [classes.Card, props.time < 0.6 ? classes.Close : null];

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

  const nextCard = `./Images/${props.nextNote}.jpg`;

  return (
    <div className={className.join(` `)}>
      {card}
      <img className={classes.NextCard} src={nextCard} alt="something" />
    </div>
  );
};

export default card;
