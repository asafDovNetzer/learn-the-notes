import React from "react";
import classes from "./Note.module.css";

const note = (props) => {
  const className = [
    classes.Note,
    props.index % 2 === 0 ? classes.Darker : null,
  ];

  const noteName = props.symbols ? props.note.noteName : props.note.noteSymbol;

  return (
    <li className={className.join(` `)}>
      <button onClick={props.handler}>
        <p>{noteName + ` ` + props.note.noteNumber}</p>
        <p>{props.note.clef}</p>
        <p>{props.note.value.toFixed(1)}</p>
      </button>
    </li>
  );
};

export default note;
