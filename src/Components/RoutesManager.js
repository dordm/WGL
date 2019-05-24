import React from "react";
import { Route, Switch } from "react-router-dom";
import MySuppliers from "../Layouts/MySuppliers";
import MyClients from "../Layouts/MyClients";
import SentInvoices from "../Layouts/SentInvoices";
import ReceivedInvoices from "../Layouts/RecievedInvoices";
import NotFound404 from "./NotFound404";

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
              listClients={data ? data.clients : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/sentInvoices/:clientId"
          render={props => (
            <SentInvoices
              data={data ? data.sentInvoices : []}
              listClients={data ? data.clients : []}
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
              listSuppliers={data ? data.listSuppliers : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/receivedInvoices/:supplierId"
          render={props => (
            <ReceivedInvoices
              data={data ? data.receivedInvoices : []}
              listSuppliers={data ? data.listSuppliers : []}
              lang={lang}
              width={width}
              {...props}
            />
          )}
        />
        <Route component={() => <NotFound404 width={width} />} />
      </Switch>
    );
  }
}

export default RoutesManager;
