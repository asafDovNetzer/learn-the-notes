import React, { Component } from "react";
import classes from "./CardGame.module.css";
import Card from "../../Components/Card/Card";
import Options from "../../Components/Options/Options";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/index";
import Stopwatch from "../../Components/Stopwatch/Stopwatch";

class CardGame extends Component {
  state = {
    eventFunction: null,
    interval: null,
  };
  componentDidMount() {
    const thisObject = this;

    let eventFunction;

    if (window.outerWidth >= 500) {
      eventFunction = function () {
        if (window.scrollY >= 50) {
          thisObject.props.onResume();
          thisObject.startStopwatch();
        }
        if (window.scrollY === 0) {
          thisObject.props.onPause();
          thisObject.stopStopwatch();
        }
      };

      window.addEventListener(`scroll`, eventFunction);
    }
    if (window.outerWidth < 500) {
      eventFunction = function () {
        if (window.pageYOffset === 0) {
          thisObject.props.onPause();
          thisObject.stopStopwatch();
        }
      };
      document.body.addEventListener(`touchmove`, eventFunction);
    }

    this.setState({ eventFunction: eventFunction });
  }

  startStopwatch = () => {
    if (this.state.interval) return;

    const interval = setInterval(() => {
      this.props.onTick();
    }, 100);

    this.setState({ interval: interval });
  };

  stopStopwatch = () => {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  };

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.state.eventFunction);
    document.body.removeEventListener(`touchmove`, this.state.eventFunction);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user) return;

    if (prevProps.notesArray !== this.props.notesArray) {
      this.props.onSaveGame(
        this.props.notesArray,
        this.props.answers,
        this.props.symbolType,
        this.props.user
      );
    }
  }

  checkAnswer = (answer) => {
    const cardGameEl = document.getElementById(`cardGame`);

    cardGameEl.scrollIntoView({ behavior: "smooth" });

    if (answer === this.props.currentNote.noteName) {
      this.props.onRightTry(this.props.currentNote);
      this.props.onCardChange();
    }

    if (answer !== this.props.currentNote.noteName) {
      this.props.onWrongTry(answer);
    }
  };

  startButtonHandler = () => {
    const cardGameEl = document.getElementById(`cardGame`);

    cardGameEl.scrollIntoView({ behavior: "smooth" });
    this.props.onResume();
    this.startStopwatch();
  };

  render() {
    return (
      <div id="cardGame" className={classes.CardGame}>
        <Card
          isRunning={this.props.isRunning}
          time={this.props.time}
          note={this.props.currentNote}
          nextNote={this.props.nextNote?.fileName}
          handler={this.startButtonHandler}
        />
        <Options
          options={this.props.options}
          symbolType={this.props.symbolType}
          isRunning={this.props.isRunning}
          handler={(answer) => this.checkAnswer(answer)}
        />
        <Stopwatch
          time={this.props.time}
          interval={this.state.interval}
          isRunning={this.props.isRunning}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notesArray: state.cardGame.notesArray,
    answers: state.cardGame.answers,
    currentNote: state.cardGame.currentNote,
    nextNote: state.cardGame.nextNote,
    options: state.cardGame.options,
    time: state.cardGame.stopwatch,
    isRunning: state.cardGame.isRunning,
    symbolType: state.cardGame.symbolType,
    user: state.cardGame.user,
    interval: state.cardGame.interval,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardChange: () => dispatch(actions.nextCard()),
    onRightTry: (answer) => dispatch(actions.flagRightAnswer(answer)),
    onSaveGame: (notesArray, answers, symbolType, user) =>
      dispatch(actions.setStorage(notesArray, answers, symbolType, user)),
    onWrongTry: (answer) => dispatch(actions.flagWrongAnswer(answer)),
    onPause: () => dispatch(actions.pauseGame()),
    onResume: () => dispatch(actions.resumeGame()),
    onTick: () => dispatch(actions.tick()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
