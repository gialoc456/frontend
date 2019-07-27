import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
// import routes from "./routes";
import "./App.css";
import Login from "./components/FormLogin/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

class App extends Component {
  onRoute = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
      return result;
    }
  };
  render() {
    const {datalogin } = this.props;
    console.log(this.props.datalogin);
    console.log(this.props.datafromtoken);
    return (
      <Router>
        <Switch>
          {/* {this.onRoute(routes)} */}
          <Route
            path="/"
            exact
            render={({ history, match }) => {
              if (datalogin) {
                return <Redirect to="/dashboard" />;
              } else {
                return <Login history={history} />;
              }
            }}
          />
          <Route
            path="/dashboard"
            render={({ history, match }) => {
              if (datalogin) {
                return <Dashboard history={history} match={match} />;
              } else {
                return <Redirect to="/"/>
              }
            }}
          />
          <Route
            path=""
            render={() => {
              return <NotFound />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    datalogin: state.datalogin,
    datafromtoken: state.datafromtoken
  };
};

export default hot(
  connect(
    mapStateToProps,
    null
  )(App)
);
