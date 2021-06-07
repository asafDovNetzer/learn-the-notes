import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";
import CardGame from "./Containers/CardGame/CardGame";
import classes from "./App.module.css";
import Aux from "./hoc/Auxiliary";
import * as actions from "./Store/Actions/index";
import Spinner from "./Components/UI/Spinner/Spinner";

const GameData = React.lazy(() => import("./Containers/GameData/GameData"));
const Settings = React.lazy(() => import("./Containers/Settings/Settings"));
const About = React.lazy(() => import("./Containers/About/About"));

class App extends Component {
  componentDidMount() {
    this.props.onInitApp();
  }

  componentDidUpdate() {
    if (this.props.answers.length > 7 && !this.props.user) {
      const thisK = this;
      window.addEventListener(`beforeunload`, thisK.unloadHandler);
    }
  }

  componentWillUnmount() {
    const thisK = this;
    window.removeEventListener(`beforeunload`, thisK.unloadHandler);
  }

  unloadHandler(e) {
    e.preventDefault();
    const message = ``;

    (e || window.event).returnValue = message;
    return message;
  }

  render() {
    const className = [
      classes.App,
      this.props.modelState || !this.props.difficulty ? classes.NoScroll : null,
    ];

    const gameDataPage = () => (
      <Aux>
        <GameData />
        <Settings />
      </Aux>
    );

    return (
      <div className={className.join(` `)}>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/game-data" render={() => gameDataPage()} exact />
              <Route path="/about" component={About} exact />
              <Route path="/" component={CardGame} exact />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modelState: state.website.modelState,
    difficulty: state.cardGame.difficulty,
    answers: state.cardGame.answers,
    user: state.cardGame.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitApp: () => dispatch(actions.checkUserStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
