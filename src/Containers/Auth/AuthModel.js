import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.module.css";
import * as actions from "../../Store/Actions/index";
import SignUp from "./AuthMethods/SignUp/SignUp";
import Login from "./AuthMethods/Login/Login";
import ActiveUserDiv from "./AuthMethods/ActiveUser/ActiveUser";
import RecoverPassword from "./AuthMethods/RecoverPassword/RecoverPassword";

class Auth extends Component {
  state = {
    method: `Login`,
    form: {
      email: {
        value: ``,
        type: `email`,
        name: `email`,
        placeholder: `Your Email address`,
        validity: undefined,
        checkEmailIsDifferent(email, thisObject) {
          const validity = thisObject.props.invalidEmail !== email;
          this.validity = validity;
          return validity;
        },
        checkValidity(value, thisObject) {
          return this.checkEmailIsDifferent(value, thisObject);
        },
      },
      password: {
        value: ``,
        type: `password`,
        name: `password`,
        placeholder: `Your password`,
        info: `Password must be 8 characters or longer...`,
        validity: undefined,
        checkPassword(password, thisObject) {
          if (!password) return undefined;
          const validity =
            password.length >= 8 &&
            password !== thisObject.props.invalidPassword;
          this.validity = validity;
          return validity;
        },
        checkValidity(value, thisObject) {
          return this.checkPassword(value, thisObject);
        },
      },
      repeatPassword: {
        value: ``,
        type: `password`,
        name: `repeatPassword`,
        placeholder: `Repeat password`,
        info: `Passwords must be identical`,
        validity: undefined,
        checkPassword(password, thisObject) {
          if (!password) return undefined;
          console.log(thisObject);
          return password === thisObject.state.form.password.value;
        },
        checkValidity(value, thisObject) {
          return this.checkPassword(value, thisObject);
        },
      },
    },
  };

  componentDidMount() {
    if (this.props.user) {
      this.setState({ method: `Logout` });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.state.form.email.checkValidity(this.state.form.email.value, this);
      this.state.form.password.checkValidity(
        this.state.form.password.value,
        this
      );
      this.setState({ form: this.state.form });
    }
  }

  onInputChange = (event) => {
    const value = event.target.value;
    const keyName = event.target.name;

    const fieldValidity = this.state.form[keyName].checkValidity(value, this);

    const key = {
      ...this.state.form[keyName],
      value: value,
      validity: fieldValidity,
    };

    const form = {
      ...this.state.form,
      [keyName]: key,
    };

    this.setState({ form: form });
  };

  changeAuthMethod = (method) => {
    this.props.onAuthTypeChange();
    this.setState({ method: method });
  };

  logoutHanlder = () => {
    this.props.onLogout();
  };
  recoverPasswordHandler = (event) => {
    event.preventDefault();
    this.props.onRecover(this.state.form.email.value);
  };
  signUpHandler = (event) => {
    event.preventDefault();
    let gameData = null;

    if (this.props.answers.length) {
      gameData = {
        notesArray: this.props.notesArray,
        answers: this.props.answers,
        symbolType: this.props.symbolType,
      };
    }
    this.props.onSignUp(
      this.state.form.email.value,
      this.state.form.password.value,
      gameData
    );
  };

  loginHandler = (event) => {
    event.preventDefault();

    this.props.onLogin(
      this.state.form.email.value,
      this.state.form.password.value
    );
  };

  render() {
    let authMethod;

    switch (this.state.method) {
      case `Sign Up`:
        authMethod = (
          <SignUp
            fields={this.state.form}
            fieldChangeHandler={this.onInputChange}
            submitHandler={this.signUpHandler}
            changeMethodHandler={this.changeAuthMethod}
            error={this.props.error}
          />
        );
        break;
      case `Login`:
        authMethod = (
          <Login
            fields={[this.state.form.email, this.state.form.password]}
            fieldChangeHandler={this.onInputChange}
            submitHandler={this.loginHandler}
            error={this.props.error}
            changeMethodHandler={this.changeAuthMethod}
          />
        );
        break;
      case `Logout`:
        authMethod = <ActiveUserDiv handler={this.logoutHanlder} />;
        break;
      case `Recover Password`:
        authMethod = (
          <RecoverPassword
            field={this.state.form.email}
            fieldChangeHandler={this.onInputChange}
            submitHandler={this.recoverPasswordHandler}
            error={this.props.error}
          />
        );
        break;
      default:
        break;
    }

    return <div className={classes.Auth}>{authMethod}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.website.error,
    invalidEmail: state.website.invalidEmail,
    invalidPassword: state.website.invalidPassword,
    user: state.cardGame.user,
    notesArray: state.cardGame.notesArray,
    answers: state.cardGame.answers,
    symbolType: state.cardGame.symbolType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (email, password, gameData) =>
      dispatch(actions.signUpAsync(email, password, gameData)),
    onLogin: (email, password) => dispatch(actions.loginAsync(email, password)),
    onRecover: (email) => dispatch(actions.recoverPasswordAsync(email)),
    onAuthTypeChange: () => dispatch(actions.clearErrors()),
    onLogout: () => dispatch(actions.logoutAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
