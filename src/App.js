import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";
import CardGame from "./Containers/CardGame/CardGame";
import classes from "./App.module.css";
import Aux from "./hoc/Auxiliary";
import * as actions from "./Store/Actions/index";

const GameData = React.lazy(() => import("./Containers/GameData/GameData"));
const Settings = React.lazy(() => import("./Containers/Settings/Settings"));
const About = React.lazy(() => import("./Containers/About/About"));

class App extends Component {
  componentDidMount() {
    this.props.onInitApp();
  }

  render() {
    const className = [
      classes.App,
      this.props.modelState ? classes.NoScroll : null,
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
          <Suspense fallback={<p>loading...</p>}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitApp: () => dispatch(actions.checkUserStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
