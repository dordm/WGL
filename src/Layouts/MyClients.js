import React from "react";
import langConf from "../js/lang";
import { withStyles } from "@material-ui/core/styles/index";
import "../js/API";
import {
  ListSuppliers,
  DivWrapper,
  StyledEditIcon,
  StyledSupplier,
  MyButton,
  StyledCloseIcon,
  StyledDialogContent,
  StyledTxtFld,
  StyledDivBtns,
  ButtonCancel
} from "../Components/StyledComponents";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import * as Sentry from "@sentry/browser";
import { updateClients } from "../Components/App";

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
      addClientOpen: false,
      addDialogEdit: false,
      client: null,
      name: "",
      id: "",
      phone: "",
      email: "",
      dialogTitle: ""
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

  onCloseAddClientDialog() {
    this.setState({
      addClientOpen: false,
      client: null,
      name: "",
      id: "",
      phone: "",
      email: ""
    });
  }

  renderInput(stateParam, label) {
    const { width, lang, classes } = this.props;

    return (
      <StyledTxtFld
        onChange={e => this.setState({ [stateParam]: e.target.value })}
        width={width}
        value={this.state[stateParam]}
        id={label}
        label={langConf[lang][label]}
        InputProps={{
          classes: {
            input: "fontStyle5",
            root:
              langConf[lang].direction === "rtl" ? classes.rtlDir : undefined
          }
        }}
        InputLabelProps={{
          classes: {
            root: classNames(
              "fontStyle4",
              langConf[lang].direction === "rtl" ? classes.labelTxt : undefined
            )
          }
        }}
      />
    );
  }

  addClient() {
    const { user, data } = this.props;
    const { id, name, email, phone } = this.state;
    window.AppApi.postCustomerData({
      businessTaxNumber: user.attributes["custom:id"],
      countryCode: user.attributes["custom:countryCode"],
      custEmail: email,
      custMobile: phone,
      custTaxNumber: id,
      custName: name,
      custVendNumber: ""
    }).then(res => {
      data.push(res);
      updateClients(data);
      this.setState({
        addClientOpen: false
      });
    });
  }

  editClient() {
    const { id, name, email, phone, client } = this.state;
    const {data} = this.props
      console.log(data)
    const newClient = JSON.parse(JSON.stringify(client));
    newClient.custName = name;
    newClient.custTaxNumber = id;
    newClient.custEmail = email;
    newClient.custMobile = phone;
    window.AppApi.putCustomerData(newClient).then(res => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].custNumber === res.custNumber) {
          data[i] = res;
          break;
        }
      }
      updateClients(data);
      this.setState({
        addClientOpen: false
      });
    });
  }

  renderAddDialog() {
    const {
      addClientOpen,
      name,
      id,
      email,
      phone,
      addDialogEdit,
      dialogTitle
    } = this.state;
    const { lang, width } = this.props;
    return (
      <Dialog
        open={addClientOpen}
        onClose={() => this.onCloseAddClientDialog()}
        PaperProps={{
          style: {
            margin: 16
          }
        }}
      >
        <StyledCloseIcon onClick={() => this.onCloseAddClientDialog()}>
          <img alt="Close" src={require("../images/Close.png")} />
        </StyledCloseIcon>
        <DialogTitle
          style={{ textAlign: "center", marginTop: 24, paddingBottom: 8 }}
        >
          {dialogTitle}
        </DialogTitle>
        <StyledDialogContent width={width} direction={langConf[lang].direction}>
          {this.renderInput("name", "compName")}
          {this.renderInput("id", "compHP")}
          {this.renderInput("phone", "phone")}
          {this.renderInput("email", "email")}
          <StyledDivBtns>
            <div style={{ width: "50%", marginRight: 10, textAlign: "right" }}>
              <ButtonCancel
                style={{ position: "initial" }}
                onClick={() => this.onCloseAddClientDialog()}
                className={"fontStyle1"}
              >
                {langConf[lang].cancel}
              </ButtonCancel>
            </div>
            <MyButton
              onClick={() => {
                addDialogEdit ? this.editClient() : this.addClient();
              }}
              disabled={!name || !id || !email || !phone}
              style={{ justifySelf: "right" }}
              width={90}
              height={36}
            >
              {addDialogEdit ? langConf[lang].save : langConf[lang].add}
            </MyButton>
          </StyledDivBtns>
        </StyledDialogContent>
      </Dialog>
    );
  }

  render() {
    const { lang, data } = this.props;
    return (
      <div align="center">
        <div style={{ marginBottom: 8, marginTop: 8 }}>
          <MyButton
            onClick={() =>
              this.setState({
                addClientOpen: true,
                addDialogEdit: false,
                dialogTitle: langConf[lang].addClient
              })
            }
            width={92}
            height={36}
          >
            {langConf[lang].addClient}
          </MyButton>
        </div>
        <DivWrapper direction={langConf[lang].direction}>
          <ListSuppliers>
            {data.map((item, idx) => (
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
                      {item.custName}
                    </Typography>
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle11"}
                    >
                      {langConf[lang].compHP + ": " + item.custTaxNumber}
                    </Typography>
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle11"}
                    >
                      {langConf[lang].phone + ": " + item.custMobile}
                    </Typography>
                    <Typography
                      style={{ textAlign: langConf[lang].right }}
                      className={"fontStyle11"}
                    >
                      {langConf[lang].email + ": " + item.custEmail}
                    </Typography>
                  </div>
                  <ListItemSecondaryAction
                    onClick={() =>
                      this.setState({
                        addDialogEdit: true,
                        addClientOpen: true,
                        dialogTitle: langConf[lang].editClient,
                        client: item,
                        name: item.custName,
                        id: item.custTaxNumber,
                        phone: item.custMobile,
                        email: item.custEmail
                      })
                    }
                    style={{
                      left:
                        langConf[lang].direction === "rtl" ? "8px" : "unset",
                      right:
                        langConf[lang].direction === "ltr" ? "8px" : "unset",
                      padding: 0
                    }}
                  >
                    <StyledEditIcon />
                  </ListItemSecondaryAction>
                </ListItem>
              </StyledSupplier>
            ))}
          </ListSuppliers>
        </DivWrapper>
        {this.renderAddDialog()}
      </div>
    );
  }
}

export default withStyles(styles)(MyClients);
