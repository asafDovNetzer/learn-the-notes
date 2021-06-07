import React, { Component } from "react";
import classes from "./CardGame.module.css";
import Card from "../../Components/Card/Card";
import Options from "../../Components/Options/Options";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/index";
import Stopwatch from "../../Components/Stopwatch/Stopwatch";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary";
import Difficulty from "../../Components/Difficulty/Difficulty";

class CardGame extends Component {
  state = {
    eventFunction: null,
    interval: null,
    thisKey: null,
    playedNote: null,
    answered: false,
  };
  componentDidMount() {
    const thisObject = this;

    let eventFunction;

    if (window.outerWidth >= 500) {
      eventFunction = function () {
        if (window.scrollY >= 20 && thisObject.props.difficulty) {
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

    this.setState({ eventFunction: eventFunction, thisKey: this });
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notesArray && !nextProps.currentNote)
      prevState.thisKey?.props.onNoteArrayMount();

    return prevState;
  }

  checkAnswer = (answer) => {
    if (this.state.answered) return;

    const cardGameEl = document.getElementById(`cardGame`);

    cardGameEl.scrollIntoView({ behavior: "smooth" });

    if (answer === this.props.currentNote.noteName) {
      const thisK = this;

      this.setState({ answered: true });

      setTimeout(() => {
        thisK.props.onRightTry(thisK.props.currentNote);
        thisK.props.onCardChange();
        thisK.setState({ playedNote: null, answered: false });
      }, 1000);
    }

    if (answer !== this.props.currentNote.noteName) {
      this.props.onWrongTry(answer);
    }

    this.setState({ playedNote: answer });
  };

  startButtonHandler = () => {
    const cardGameEl = document.getElementById(`cardGame`);

    cardGameEl.scrollIntoView({ behavior: "smooth" });
    this.props.onResume();
    this.startStopwatch();
  };

  onChooseDifficulty = (difficulty) => {
    this.props.setDifficultyLevel(difficulty);
  };

  render() {
    let cardGame = <Spinner />;

    if (this.props.nextNote) {
      cardGame = (
        <Aux>
          <Card
            isRunning={this.props.isRunning}
            note={this.props.currentNote}
            nextNote={this.props.nextNote?.fileName}
            handler={this.startButtonHandler}
            answer={this.state.playedNote}
          />
          <Options
            options={this.props.options}
            symbolType={this.props.symbolType}
            isRunning={this.props.isRunning}
            handler={(answer) => this.checkAnswer(answer)}
            rightAnswer={this.props.currentNote}
            answer={this.state.playedNote}
          />
          <h1
            className={[
              classes.Message,
              !this.props.isRunning && classes.Hidden,
            ].join(` `)}
          >
            Scroll up to pause
          </h1>
          <Stopwatch />
        </Aux>
      );
    }

    if (!this.props.difficulty) {
      cardGame = <Difficulty chooseHandler={this.onChooseDifficulty} />;
    }

    return (
      <div id="cardGame" className={classes.CardGame}>
        {cardGame}
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
    isRunning: state.cardGame.isRunning,
    symbolType: state.cardGame.symbolType,
    user: state.cardGame.user,
    interval: state.cardGame.interval,
    difficulty: state.cardGame.difficulty,
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
    onNoteArrayMount: () => dispatch(actions.setFirstNotes()),
    setDifficultyLevel: (difficulty) =>
      dispatch(actions.initNotesArray(difficulty)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
