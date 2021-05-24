import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/index";
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toollbar";
import AuthModel from "../../Containers/Auth/AuthModel";
import Backdrop from "../UI/Backdrop/Backdrop";

class Layout extends Component {
  backdropHandler = () => {
    this.props.onUserPress(false);
  };

  render() {
    const authModel = this.props.modelState ? <AuthModel /> : null;

    return (
      <Aux>
        <Toolbar />
        {authModel}
        <Backdrop
          closeModal={this.backdropHandler}
          show={this.props.modelState}
        />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modelState: state.website.modelState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserPress: (newState) => {
      dispatch(actions.clearErrors());
      dispatch(actions.toggleModel(newState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
