import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/index";
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toollbar";
import AuthModel from "../../Containers/Auth/AuthModel";
import Backdrop from "../UI/Backdrop/Backdrop";
import Difficulty from "../Difficulty/Difficulty";

class Layout extends Component {
  backdropHandler = () => {
    this.props.onUserPress(false);
  };

  onChooseDifficulty = (difficulty) => {
    this.props.setDifficultyLevel(difficulty);
  };

  render() {
    const authModel = this.props.modelState ? <AuthModel /> : null;

    const difficultyDiv = false ? (
      <Difficulty chooseHandler={this.onChooseDifficulty} />
    ) : null;

    return (
      <Aux>
        <Toolbar />
        {authModel}
        {difficultyDiv}
        <Backdrop
          closeModal={this.backdropHandler}
          show={!!authModel || !!difficultyDiv}
        />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modelState: state.website.modelState,
    difficulty: state.cardGame.difficulty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserPress: (newState) => {
      dispatch(actions.clearErrors());
      dispatch(actions.toggleModel(newState));
    },
    setDifficultyLevel: (difficulty) =>
      dispatch(actions.initNotesArray(difficulty)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
