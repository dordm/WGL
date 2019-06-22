import React from "react";
import langConf from "../js/lang";
import "../js/API";
import {
  ListSuppliers,
  StyledDownloadIcon,
  DivWrapper,
  StyledSupplier,
  StyledSelect
} from "../Components/StyledComponents";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import * as Sentry from "@sentry/browser";

class SentInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClient: props.match.params.clientId || ""
    };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const { lang, data, listClients } = this.props;
    const { selectedClient } = this.state;
    return (
      <div align="center">
        <div style={{ marginBottom: 16 }}>
          <Typography className={"fontStyle19"}>
            {langConf[lang].filterByClient}
          </Typography>
          <StyledSelect
            direction={langConf[lang].direction}
            onChange={e => this.setState({ selectedClient: e.target.value })}
            className={"fontStyle16"}
            value={selectedClient}
          >
            <option value={""}>{langConf[lang].all}</option>
            {listClients.map((item, idx) => (
              <option key={idx} value={item.custNumber}>
                {item.custName}
              </option>
            ))}
          </StyledSelect>
        </div>
        <DivWrapper direction={langConf[lang].direction}>
          <ListSuppliers>
            {data
              .filter(
                item =>
                  selectedClient ? item.clientId === selectedClient : true
              )
              .map((item, idx) => (
                <StyledSupplier key={idx}>
                  <ListItem>
                    <ListItemText
                      style={{
                        paddingLeft:
                          langConf[lang].direction === "rtl" ? "20px" : "unset",
                        paddingRight:
                          langConf[lang].direction === "ltr" ? "20px" : "unset",
                        marginRight:
                          langConf[lang].direction === "rtl" ? "-16px" : "unset"
                      }}
                      primary={
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle5"}
                        >
                          {item.clientName + " - " + item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle11"}
                        >
                          {langConf[lang].invoiceAmount + item.amount}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction
                      style={{
                        left:
                          langConf[lang].direction === "rtl" ? "8px" : "unset",
                        right:
                          langConf[lang].direction === "ltr" ? "8px" : "unset",
                        padding: 0
                      }}
                    >
                      <StyledDownloadIcon />
                    </ListItemSecondaryAction>
                  </ListItem>
                </StyledSupplier>
              ))}
          </ListSuppliers>
        </DivWrapper>
      </div>
    );
  }
}

export default SentInvoices;
