import React from "react";
import classes from "./Note.module.css";
import ReactTooltip from "react-tooltip";

const note = (props) => {
  const className = [
    classes.Note,
    props.note.locked ? classes.Locked : classes.Unlocked,
    props.index % 2 === 0 ? classes.Darker : null,
  ];

  const dataTip = props.note.locked
    ? `Continue playing to unlock this note`
    : `Click to view note data`;
  // const dataTip = `<img style=" width: 150px; height: 150px; " src="./Images/${props.note.fileName}.jpg" alt="something" />`;

  // console.log(props.note.locked);

  const noteName = props.symbols ? props.note.noteName : props.note.noteSymbol;

  return (
    <li className={className.join(` `)}>
      <button
        data-tip={dataTip}
        // data-html="true"
        // data-class={classes.Tip}
        data-delay-show="700"
        data-effect="solid"
        onClick={props.handler}
      >
        <p>{noteName + ` ` + props.note.noteNumber}</p>
        <p>{props.note.clef}</p>
        <p>{props.note.value.toFixed(1)}</p>
      </button>
      <ReactTooltip />
    </li>
  );
};

export default note;
