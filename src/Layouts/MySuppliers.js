import React from "react";
import langConf from "../js/lang";
import styled from "styled-components";
import "../js/API";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {
  StyledChip,
  ListSuppliers,
  DivWrapper,
  StyledSupplier,
    ShowIcon,
    TypoLastInvoice
} from "../Components/StyledComponents";
import { Link } from "react-router-dom";
import { notifySetScreen } from "../Components/NavBar";
import * as Sentry from "@sentry/browser";

const DivTitle = styled.div`
  margin-left: ${props =>
    props.direction === "rtl" ? "0px" : "8px"} !important;
  margin-right: ${props =>
    props.direction === "rtl" ? "8px" : "0px"} !important;
`;

class MySuppliers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  getAddr(country, city, street) {
    let res = "";
    res += country || "";
    res += city ? (res ? `, ${city}` : city) : "";
    res += street ? (res ? `, ${street}` : street) : "";
    return res;
  }

  render() {
    const { lang, data } = this.props;
    return (
      <DivWrapper direction={langConf[lang].direction}>
        <ListSuppliers>
          {data.map((item, idx) => (
            <StyledSupplier key={idx}>
              <ListItem>
                <DivTitle direction={langConf[lang].direction}>
                  <Typography
                    style={{ textAlign: langConf[lang].right }}
                    className={"fontStyle24"}
                  >
                    {item.vendorName}
                  </Typography>
                  {item.vendorMobile ? (
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle7"}
                    >
                      {langConf[lang].phone + ": " + item.vendorMobile}
                    </Typography>
                  ) : (
                    ""
                  )}
                  {item.vendorEmail ? (
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle7"}
                    >
                      {langConf[lang].email + ": " + item.vendorEmail}
                    </Typography>
                  ) : (
                    ""
                  )}
                  {item.vendorCountry ||
                  item.vendorCity ||
                  item.vendorStreet ? (
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle7"}
                    >
                      {langConf[lang].address +
                        ": " +
                        this.getAddr(
                          item.vendorCountry,
                          item.vendorCity,
                          item.vendorStreet
                        )}
                    </Typography>
                  ) : (
                    ""
                  )}
                </DivTitle>
              </ListItem>
              {item.lastInvoiceDate ? (
                <div>
                  <Divider />
                  <TypoLastInvoice>
                    {langConf[lang].lastInvoiceDate +
                      item.lastInvoiceDate.substr(0, 10)}
                  </TypoLastInvoice>
                  <ListItem style={{ justifyContent: "center", marginTop:8 }}>
                    <StyledChip
                      type={"info"}
                      icon={<ShowIcon direction={langConf[lang].direction} />}
                      label={langConf[lang].showAllInvoices}
                      onClick={() => {
                        notifySetScreen(langConf[lang].receivedInvoices);
                      }}
                      component={Link}
                      to={"/receivedInvoices/" + item.vendorNumber}
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
    );
  }
}

export default MySuppliers;
