import React from "react";
import { Route, Switch } from "react-router-dom";
import MySuppliers from "../Layouts/MySuppliers";
import MyClients from "../Layouts/MyClients";
import SentInvoices from "../Layouts/SentInvoices";
import ReceivedInvoices from "../Layouts/RecievedInvoices";

class RoutesManager extends React.Component {
  render() {
    const { lang, width, data } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <MySuppliers
              data={data ? data.suppliers : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/suppliers"
          render={props => (
            <MySuppliers
              data={data ? data.suppliers : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/clients"
          render={props => (
            <MyClients
              data={data ? data.clients : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/sentInvoices"
          render={props => (
            <SentInvoices
              data={data ? data.sentInvoices : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/receivedInvoices"
          render={props => (
            <ReceivedInvoices
              data={data ? data.receivedInvoices : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

export default RoutesManager;
