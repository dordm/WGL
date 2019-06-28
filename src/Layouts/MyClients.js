import React from "react";
import langConf from "../js/lang";
import { withStyles } from "@material-ui/core/styles/index";
import "../js/API";
import {
  ListSuppliers,
  DivWrapper,
  StyledSupplier,
  ShowIcon,
  TypoLastInvoice,
  StyledChip,
  StyledSearchIcon
} from "../Components/StyledComponents";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import * as Sentry from "@sentry/browser";
import { Link } from "react-router-dom";
import { notifySetScreen } from "../Components/NavBar";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = {
  labelTxt: {
    right: 0,
    transform: "translate(0, 0px) scale(1)"
  },
  rtlDir: {
    direction: "rtl"
  }
};

class MyClients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
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
    const { lang, data } = this.props;
    const { searchInput } = this.state;
    return (
      <div align="center">
        <div style={{ marginBottom: 16 }}>
          <TextField
            direction={langConf[lang].direction}
            onChange={e => this.setState({ searchInput: e.target.value })}
            value={searchInput}
            placeholder={langConf[lang].clientName}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: langConf[lang].direction === "ltr" ? "searchInput" : "searchInputRtl"
              },
              startAdornment: (
                <InputAdornment position="start">
                  <StyledSearchIcon direction={langConf[lang].direction} />
                </InputAdornment>
              )
            }}
          />
        </div>
        <DivWrapper direction={langConf[lang].direction}>
          <ListSuppliers>
            {data
              .filter(item => item.custName.toLowerCase().includes(searchInput.toLowerCase()))
              .map((item, idx) => (
                <StyledSupplier key={idx}>
                  <ListItem>
                    <div
                      style={{
                        paddingLeft:
                          langConf[lang].direction === "rtl" ? "20px" : "unset",
                        paddingRight:
                          langConf[lang].direction === "ltr" ? "20px" : "unset"
                      }}
                    >
                      <Typography
                        style={{ textAlign: langConf[lang].right }}
                        className={"fontStyle5"}
                      >
                        {item.custName}
                      </Typography>
                      {item.custTaxNumber ? (
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle11"}
                        >
                          {langConf[lang].compHP + ": " + item.custTaxNumber}
                        </Typography>
                      ) : (
                        ""
                      )}
                      {item.custMobile ? (
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle11"}
                        >
                          {langConf[lang].phone + ": " + item.custMobile}
                        </Typography>
                      ) : (
                        ""
                      )}
                      {item.custEmail ? (
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle11"}
                        >
                          {langConf[lang].email + ": " + item.custEmail}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </div>
                  </ListItem>
                  {item.lastInvoiceDate ? (
                    <div>
                      <Divider />
                      <TypoLastInvoice>
                        {langConf[lang].lastInvoiceDate +
                          item.lastInvoiceDate.substr(0, 10)}
                      </TypoLastInvoice>
                      <ListItem
                        style={{ justifyContent: "center", marginTop: 8 }}
                      >
                        <StyledChip
                          type={"info"}
                          icon={
                            <ShowIcon direction={langConf[lang].direction} />
                          }
                          label={langConf[lang].showAllInvoices}
                          onClick={() => {
                            notifySetScreen(langConf[lang].sentInvoices);
                          }}
                          component={Link}
                          to={"/sentInvoices/" + item.custNumber}
                          variant={"outlined"}
                        />
                      </ListItem>
                    </div>
                  ) : (
                    ""
                  )}
                </StyledSupplier>
              ))}
          </ListSuppliers>
        </DivWrapper>
      </div>
    );
  }
}

export default withStyles(styles)(MyClients);
