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
import Loader from "../Components/Loader";

class ReceivedInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComp: props.match.params.supplierId || "",
      loading: false,
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
      this.loadData(this.props.match.params.supplierId);
    }
  }

  loadData(supplierId) {
    const { user } = this.props;
    if (supplierId) {
      this.setState({ loading: true });
      window.AppApi.getVendorInvoices(
        user.attributes["custom:countryCode"],
        user.attributes["custom:id"],
        supplierId
      ).then(res => this.setState({ currInvoices: res, loading: false }));
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.loadData(this.props.match.params.supplierId);
    }
  }

  changeSelectVal(val) {
    this.setState({ selectedComp: val });
    if (val) {
      this.loadData(val);
    } else this.setState({ currInvoices: null });
  }

  render() {
    const { lang, data, listSuppliers } = this.props;
    const { selectedComp, loading, currInvoices } = this.state;
    return (
      <div align="center">
        <div style={{ marginBottom: 16 }}>
          <Typography className={"fontStyle19"}>
            {langConf[lang].filterBySupplier}
          </Typography>
          <StyledSelect
            direction={langConf[lang].direction}
            onChange={e => this.changeSelectVal(e.target.value)}
            className={"fontStyle16"}
            value={selectedComp}
          >
            <option value={""}>{langConf[lang].lastInvoices}</option>
            {listSuppliers.map((item, idx) => (
              <option key={idx} value={item.vendorNumber}>
                {item.vendorName}
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
                      {item.businessName ||
                        `${
                          langConf[lang].invoiceDate
                        }: ${item.invoiceDate.substr(0, 10)}`}
                    </Typography>
                    {item.businessName ? (
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
              </StyledSupplier>
            ))}
          </ListSuppliers>
        </DivWrapper>
        <Loader size={50} open={loading} />
      </div>
    );
  }
}

export default ReceivedInvoices;
