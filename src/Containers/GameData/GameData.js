import React, { Component } from "react";
import classes from "./GameData.module.css";
import Games from "../../Components/Games/Games";
import Notes from "../../Components/Notes/Notes";
import Img from "../../Components/Image/Image";
import Backdrop from "../../Components/UI/Backdrop/Backdrop";
import Chart from "../../Components/ValueChart/ValueChart";
import { connect } from "react-redux";

class GameData extends Component {
  state = {
    displayed: true,
    note: null,
  };

  onNotePress(note) {
    this.setState({ note: note });
  }
  onCloseModal = () => {
    this.setState({ note: null });
  };
  displayNotes = () => {
    this.setState({ displayed: true });
  };
  displayGames = () => {
    this.setState({ displayed: false });
  };

  render() {
    return (
      <div className={classes.GameData}>
        <div className={classes.Switch}>
          <button
            className={!this.state.displayed ? classes.NotesActive : null}
            onClick={this.displayNotes}
          >
            Notes
          </button>
          <button
            className={this.state.displayed ? classes.GamesActive : null}
            onClick={this.displayGames}
          >
            Games
          </button>
        </div>
        <Notes
          noteHandler={(note) => this.onNotePress(note)}
          display={this.state.displayed}
          symbols={this.props.symbols}
        />
        <Games
          answersArray={this.props.answersArray}
          display={this.state.displayed}
          symbols={this.props.symbols}
        />
        <div className={classes.Selector}>
          <h2
            className={[
              classes.MobileOnly,
              !this.state.displayed && classes.Hidden,
            ].join(` `)}
          >
            Click on note for additional info
          </h2>
        </div>
        <Img note={this.state.note} />
        <Chart note={this.state.note} />
        <Backdrop closeModal={this.onCloseModal} show={this.state.note} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    answersArray: state.cardGame.answers,
    notesArray: state.cardGame.notesArray,
    symbols: state.cardGame.symbolType,
  };
};

export default connect(mapStateToProps)(GameData);
