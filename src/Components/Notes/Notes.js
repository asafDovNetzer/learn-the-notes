import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import Note from "./Note/Note";
import classes from "./Notes.module.css";
import Spinner from "../UI/Spinner/Spinner";

class Notes extends Component {
  state = {
    clef: 1,
    value: 1,
  };

  changeClefSort = () => {
    const clefSort = this.state.clef + 1;
    this.setState({ clef: clefSort });
  };

  changeValueSort = () => {
    const valueSort = this.state.value + 1;
    this.setState({ value: valueSort });
  };

  render() {
    if (!this.props.notesArray) {
      return <Spinner />;
    }

    const notesArray = [];

    if (this.state.clef % 3 === 1 || this.state.clef % 3 === 2)
      notesArray.push(...this.props.notesArray?.F);
    if (this.state.clef % 3 === 1 || this.state.clef % 3 === 0)
      notesArray.push(...this.props.notesArray?.G);

    if (this.state.value % 2) notesArray.sort((a, b) => b.value - a.value);
    if (!(this.state.value % 2)) notesArray.sort((a, b) => a.value - b.value);

    let clefButtonName;

    switch (this.state.clef % 3) {
      case 0:
        clefButtonName = `G Clef`;
        break;
      case 1:
        clefButtonName = `Both Clefs`;
        break;
      case 2:
        clefButtonName = `F Clef`;
        break;
      default:
        break;
    }

    const chevron = this.state.value % 2 ? `up` : `down`;
    const svgOpacity = this.state.value !== 1 ? 1 : 0;

    const clefButtonBorderClass =
      this.state.clef % 3 !== 1 ? classes.Border : null;
    const valueButtonBorderClass =
      this.state.value !== 1 ? classes.Border : null;

    let notes = (
      <div className={classes.Notes}>
        <div className={classes.TableHead}>
          <p>Note</p>
          <button
            className={clefButtonBorderClass}
            onClick={this.changeClefSort}
          >
            {clefButtonName}
          </button>
          <button
            className={valueButtonBorderClass}
            onClick={this.changeValueSort}
          >
            <svg
              style={{ marginRight: `6px`, opacity: svgOpacity }}
              width="14"
              height="14"
              fill="currentColor"
            >
              <use href={`${icons}#chevron-${chevron}`} />
            </svg>
            Value
          </button>
        </div>
        <ul>
          {notesArray.map((note, index) => (
            <Note
              key={note.fileName}
              index={index}
              note={note}
              symbols={this.props.symbols}
              handler={() => this.props.noteHandler(note)}
            />
          ))}
        </ul>
      </div>
    );

    if (!this.props.display) {
      notes = null;
    }

    return notes;
  }
}

const mapStateToProps = (state) => {
  return {
    notesArray: state.cardGame.notesArray,
  };
};

export default connect(mapStateToProps)(Notes);
