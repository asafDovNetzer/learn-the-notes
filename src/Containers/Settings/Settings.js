import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Settings.module.css";
import Switch from "../../Components/UI/Switch/Switch";
import DeleteButton from "../../Components/UI/DeleteButton/DeleteButton";
import * as actions from "../../Store/Actions/index";

class Settings extends Component {
  state = {
    buttonActivated: false,
  };

  onDeleteMemory = () => {
    this.props.onDelete(this.props.user);
    this.setState({ buttonActivated: false });
  };

  onCheckboxChange = () => {
    this.props.onChangeSymbol();
  };
  onActivate = () => {
    this.setState({ buttonActivated: true });
    const thisComponent = this;
    setTimeout(function () {
      thisComponent.setState({ buttonActivated: false });
    }, 1500);
  };

  componentDidUpdate(prevProps) {
    if (!this.props.user) return;

    if (prevProps.symbolType !== this.props.symbolType) {
      this.props.onSaveGame(
        this.props.notesArray,
        this.props.answers,
        this.props.symbolType,
        this.props.user
      );
    }
  }

  render() {
    return (
      <div className={classes.Settings}>
        <Switch
          symbolType={this.props.symbolType}
          handler={() => this.onCheckboxChange()}
        />
        <DeleteButton
          activated={this.state.buttonActivated}
          handler={
            this.state.buttonActivated ? this.onDeleteMemory : this.onActivate
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    symbolType: state.cardGame.symbolType,
    notesArray: state.cardGame.notesArray,
    answers: state.cardGame.answers,
    user: state.cardGame.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSymbol: () => dispatch(actions.changeSymbols()),
    onDelete: (user) => dispatch(actions.deleteStorageAsync(user)),
    onSaveGame: (notesArray, answers, symbolType, user) =>
      dispatch(actions.setStorage(notesArray, answers, symbolType, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
