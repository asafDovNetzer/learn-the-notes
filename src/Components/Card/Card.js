import React, { useState, useEffect } from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./Card.module.css";
import Aux from "../../hoc/Auxiliary";

const Card = (props) => {
  // const [timeouts, setTimeouts] = useState({ short: null, long: null });
  const [messageClassName, setMessageClassName] = useState(classes.First);
  const [cardClassName, setCardClassName] = useState([
    classes.Card,
    classes.Close,
  ]);

  useEffect(() => {
    setCardClassName([classes.Card, classes.Close]);
    setMessageClassName(classes.First);

    const short = setTimeout(() => {
      setCardClassName([classes.Card]);
    }, 500);

    const long = setTimeout(() => {
      setMessageClassName(classes.None);
    }, 4000);

    // setTimeouts({ short: short, long: long });

    return () => {
      clearTimeout(short);
      clearTimeout(long);
    };
  }, [props.isRunning, props.note]);

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
      <div className={messageClassName}>
        <h1>NEW NOTE !</h1>
      </div>
    ) : null;

  const nextCard = `./Images/${props.nextNote}.jpg`;

  return (
    <Aux>
      {massageDiv}
      <div className={cardClassName.join(` `)}>
        {card}
        {success}
        <img className={classes.NextCard} src={nextCard} alt="something" />
      </div>
    </Aux>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.answer === nextProps.answer &&
    prevProps.isRunning === nextProps.isRunning &&
    prevProps.note === nextProps.note
  );
};

export default React.memo(Card, areEqual);
