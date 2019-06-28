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
      selectedClient: props.match.params.clientId || "",
      currInvoices: null
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

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.loadData(this.props.match.params.clientId);
    }
  }

  loadData(clientId) {
    const { user } = this.props;
    if (clientId) {
      this.setState({ loading: true });
      window.AppApi.getCustomerInvoicesList(
        user.attributes["custom:countryCode"],
        user.attributes["custom:id"],
        clientId
      ).then(res => this.setState({ currInvoices: res, loading: false }));
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.loadData(this.props.match.params.clientId);
    }
  }

  changeSelectVal(val) {
    this.setState({ selectedClient: val });
    if (val) {
      this.loadData(val);
    } else this.setState({ currInvoices: null });
  }

  render() {
    const { lang, data, listClients } = this.props;
    const { selectedClient, currInvoices } = this.state;
    return (
      <div align="center">
        <div style={{ marginBottom: 16 }}>
          <Typography className={"fontStyle19"}>
            {langConf[lang].filterByClient}
          </Typography>
          <StyledSelect
            direction={langConf[lang].direction}
            onChange={e => this.changeSelectVal(e.target.value)}
            className={"fontStyle16"}
            value={selectedClient}
          >
            <option value={""}>{langConf[lang].lastInvoices}</option>
            {listClients.map((item, idx) => (
              <option key={idx} value={item.custNumber}>
                {item.custName}
              </option>
            ))}
          </StyledSelect>
        </div>
        <DivWrapper direction={langConf[lang].direction}>
          <ListSuppliers>
            {(currInvoices ? currInvoices : data).map((item, idx) => (
              <StyledSupplier key={idx}>
                <ListItem>
                  <div
                    style={{
                      paddingLeft:
                        langConf[lang].direction === "rtl" ? "20px" : "unset",
                      paddingRight:
                        langConf[lang].direction === "ltr" ? "20px" : "unset",
                      marginRight:
                        langConf[lang].direction === "rtl" ? "-16px" : "unset"
                    }}
                  >
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle5"}
                    >
                      {item.custName ||
                        `${
                          langConf[lang].invoiceDate
                        }: ${item.invoiceDate.substr(0, 10)}`}
                    </Typography>
                    {item.custName ? (
                      <Typography
                        style={{ textAlign: langConf[lang].right }}
                        className={"fontStyle11"}
                      >
                        {`${
                          langConf[lang].invoiceDate
                        }: ${item.invoiceDate.substr(0, 10)}`}
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle11"}
                    >
                      {`${langConf[lang].invoiceAmount}: ${
                        item.invoiceAmount
                      }₪`}
                    </Typography>
                    {item.invoiceTaxAmount ? (
                      <Typography
                        style={{ textAlign: langConf[lang].right }}
                        className={"fontStyle11"}
                      >
                        {`${langConf[lang].taxAmount}: ${
                          item.invoiceTaxAmount
                        }₪`}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.invoiceOpenAmount ? (
                      <Typography
                        style={{ textAlign: langConf[lang].right }}
                        className={"fontStyle11"}
                      >
                        {`${langConf[lang].openAmount}: ${
                          item.invoiceOpenAmount
                        }₪`}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </div>
                  <ListItemSecondaryAction
                    style={{
                      left:
                        langConf[lang].direction === "rtl" ? "8px" : "unset",
                      right:
                        langConf[lang].direction === "ltr" ? "8px" : "unset",
                      padding: 0
                    }}
                    onClick={() => window.open(item.fileLocationUrl)}
                  >
                    <StyledDownloadIcon />
                  </ListItemSecondaryAction>
                </ListItem>
                {/*<ListItem>*/}
                {/*<ListItemText*/}
                {/*style={{*/}
                {/*paddingLeft:*/}
                {/*langConf[lang].direction === "rtl" ? "20px" : "unset",*/}
                {/*paddingRight:*/}
                {/*langConf[lang].direction === "ltr" ? "20px" : "unset",*/}
                {/*marginRight:*/}
                {/*langConf[lang].direction === "rtl" ? "-16px" : "unset"*/}
                {/*}}*/}
                {/*primary={*/}
                {/*<Typography*/}
                {/*style={{ textAlign: langConf[lang].right }}*/}
                {/*className={"fontStyle5"}*/}
                {/*>*/}
                {/*{item.clientName + " - " + item.name}*/}
                {/*</Typography>*/}
                {/*}*/}
                {/*secondary={*/}
                {/*<Typography*/}
                {/*style={{ textAlign: langConf[lang].right }}*/}
                {/*className={"fontStyle11"}*/}
                {/*>*/}
                {/*{langConf[lang].invoiceAmount + item.amount}*/}
                {/*</Typography>*/}
                {/*}*/}
                {/*/>*/}
                {/*<ListItemSecondaryAction*/}
                {/*style={{*/}
                {/*left:*/}
                {/*langConf[lang].direction === "rtl" ? "8px" : "unset",*/}
                {/*right:*/}
                {/*langConf[lang].direction === "ltr" ? "8px" : "unset",*/}
                {/*padding: 0*/}
                {/*}}*/}
                {/*>*/}
                {/*<StyledDownloadIcon />*/}
                {/*</ListItemSecondaryAction>*/}
                {/*</ListItem>*/}
              </StyledSupplier>
            ))}
          </ListSuppliers>
        </DivWrapper>
      </div>
    );
  }
}

export default SentInvoices;
