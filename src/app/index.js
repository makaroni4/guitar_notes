import styles from './styles/app.scss'

import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Stats } from "./components/Stats";

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/"} component={Root}>
          <IndexRoute component={Home} />
          <Route path={"stats"} component={Stats} />
          <Route path={"home"} component={Home} />
        </Route>
      </Router>
    );
  }
}

render(<App/>, document.getElementsByClassName("app")[0]);
