import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import * as actions from "../../../Store/Actions/index";
import classes from "./Toolbar.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import NavigationItems from "../NavigationItems/NavigationItems";
import StorageIcon from "../../UI/StorageIcon/StorageIcon";

class Toolbar extends Component {
  onUserClick = () => {
    const newState = !this.props.modelState;
    this.props.onUserPress(newState);
  };

  render() {
    const className = [
      classes.Toolbar,
      this.props.isRunning ? classes.Hidden : null,
    ];

    const url = window.location.origin;

    const userIconHoverM = this.props.user ? `Logged in` : `No user active`;

    return (
      <header className={className.join(` `)}>
        <img
          className={classes.DesktopOnly}
          src={`${url}/logo7.png`}
          alt="clef"
        />
        <StorageIcon user={this.props.user} storage={this.props.storage} />
        <nav>
          <NavigationItems />
        </nav>
        <button
          data-tip={userIconHoverM}
          data-effect="solid"
          className={classes.Link}
          onClick={this.onUserClick}
        >
          <svg
            className={this.props.user ? classes.SignedIn : null}
            width="26"
            height="26"
            fill="currentColor"
          >
            <use href={`${icons}#person-circle`} />
          </svg>
        </button>
        <ReactTooltip />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRunning: state.cardGame.isRunning,
    storage: state.website.storage,
    user: state.cardGame.user,
    modelState: state.website.modelState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserPress: (newState) => dispatch(actions.toggleModel(newState)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
