import React from "react";
import langConf from "../js/lang";
import styled from "styled-components";
import "../js/API";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DownloadIcon from "@material-ui/icons/GetApp";
import {StyledChip} from "../Components/StyledComponents";
import Visibility from "@material-ui/icons/Visibility";
import {Link} from 'react-router-dom';

const DivWrapper = styled.div`
  direction: ${props => props.direction};
  display: flex;
  justify-content: center;
`;

const ShowIcon = styled(Visibility)`
    color: #4C84FF !important;
    height: 20px !important;
    width: 20px !important;
    margin-left: ${props => props.direction === "rtl" ? "-8px" : "4px"} !important;
    margin-right: ${props => props.direction === "rtl" ? "4px" : "-8px"} !important;
`;

const StyledDownloadIcon = styled(DownloadIcon)`
    fill: #4c84ff !important;
    cursor:pointer;
`;

const StyledSupplier = styled.div`
  background: white;
  margin-bottom: 24px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

const ListSuppliers = styled(List)`
  width: 50%;
  @media (max-width: 1650px) and (min-width: 1050px) {
    width: 60%;
  }
  @media (max-width: 1050px) and (min-width: 600px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TypoLastInvoice = styled(Typography)`
    text-align:center;
    margin-top:8px !important;
    margin-bottom: -8px !important;
    font-family: Arial !important;
    font-weight: bold !important;
    font-size:14px !important;
`;

class MySuppliers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: []
    };
  }

  render() {
    const { lang, width, data } = this.props;
    return (
      <DivWrapper direction={langConf[lang].direction}>
        <ListSuppliers>
          {data.map((item, idx) => (
            <StyledSupplier key={idx}>
              <ListItem>
                <Avatar
                  imgProps={{
                    style: {
                      objectFit: "contain"
                    }
                  }}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                  alt="logo"
                  src={item.logo}
                />
                <ListItemText
                  primary={
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle24"}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle7"}
                    >
                      {item.desc}
                    </Typography>
                  }
                />
              </ListItem>
              {item.lastInvoice ? (
                <div>
                  <Divider />
                    <TypoLastInvoice>
                        {langConf[lang].lastInvoice}
                    </TypoLastInvoice>
                  <ListItem>
                    <ListItemText
                        style={{
                            paddingLeft: langConf[lang].direction === "rtl" ? "20px" : "unset",
                            paddingRight: langConf[lang].direction === "ltr" ? "20px" : "unset"
                        }}
                      primary={
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle5"}
                        >
                          {item.lastInvoice.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          style={{ textAlign: langConf[lang].right }}
                          className={"fontStyle11"}
                        >
                          {langConf[lang].invoiceAmount +
                            item.lastInvoice.amount}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction
                      style={{
                        left: langConf[lang].direction === "rtl" ? "8px" : "unset",
                        right: langConf[lang].direction === "ltr" ? "8px" : "unset"
                      }}
                    >
                      <StyledDownloadIcon/>
                    </ListItemSecondaryAction>
                  </ListItem>
                    <ListItem style={{justifyContent:'center'}}>
                        <StyledChip
                            type={"info"}
                            icon={<ShowIcon direction={langConf[lang].direction} />}
                            label={langConf[lang].showAllInvoices}
                            onClick={() => {}}
                            component={Link}
                            to={"/receivedInvoices"}
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