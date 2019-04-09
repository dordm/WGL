import React from "react";
import { Route, Switch } from "react-router-dom";
import langConf from "../js/lang";

class RoutesManager extends React.Component {
  render() {
    const { lang } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <div style={{ direction: langConf[lang].direction }}>sdafdgdfg</div>
          )}
        />
      </Switch>
    );
  }
}

export default RoutesManager;
