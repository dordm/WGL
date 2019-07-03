import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import RoutesManager from "./RoutesManager";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import langConf from "../js/lang";
import InvoiceIcon from "@material-ui/icons/Receipt";
import ReceiveIcon from "@material-ui/icons/Archive";
import ClientsIcon from "@material-ui/icons/Contacts";
import SuppliersIcon from "@material-ui/icons/GroupWork";
import InviteIcon from "@material-ui/icons/InsertInvitation";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify/lib/index";
import classNames from "classnames";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { showSnackbar } from "./CustomizedSnackbar";
import {
  MyButton,
  StyledCloseIcon,
  StyledDialogContent,
  StyledTxtFld,
  StyledDivBtns,
  ButtonCancel
} from "../Components/StyledComponents";

const Logo = styled.img`
  height: 50px;
  width: 100px;
`;

const LangFormControl = styled(FormControl)`
  right: ${props => (props.direction === "ltr" ? "16px" : "")};
  left: ${props => (props.direction === "rtl" ? "16px" : "")};
  position: absolute !important;
`;

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    background: "#F5F7FB"
  },
  appBar: {
    backgroundColor: "#2196f3",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  drawerPaper: {
    width: drawerWidth,
    right: 0,
    left: "auto"
  },
  drawerPaperLtr: {
    width: drawerWidth,
    right: "auto",
    left: 0
  },
  content: {
    flexGrow: 1,
    padding: 16,
    marginTop: 60
  },
  labelTxt: {
    right: 0,
    transform: "translate(0, 0px) scale(1)"
  },
  rtlDir: {
    direction: "rtl"
  }
});

export const notifySetScreen = screen => {
  setScreenNotify(screen);
};

function setScreenNotify(screen) {
  this.setState({
    screen: screen
  });
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      lang: localStorage.getItem("language") || "hebrew",
      screen: "",
      inviteOpen: false,
      email: ""
    };

    setScreenNotify = setScreenNotify.bind(this);
  }

  componentDidMount() {
    this.setScreen(this.state.lang);
  }

  setScreen(lang) {
    if (window.location.pathname.includes("/sentInvoices"))
      this.setState({ screen: langConf[lang].sentInvoices });
    else if (window.location.pathname.includes("/receivedInvoices"))
      this.setState({ screen: langConf[lang].receivedInvoices });
    else if (window.location.pathname.includes("/clients"))
      this.setState({ screen: langConf[lang].myClients });
    else this.setState({ screen: langConf[lang].mySuppliers });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  setLang(lang) {
    this.setState({ lang });
    this.setScreen(lang);
    localStorage.setItem("language", lang);
  }

  logout() {
    Auth.signOut()
      .then(data => {})
      .catch(err => {});
  }

  renderInput(stateParam, label) {
    const { lang } = this.state;
    const { width, classes } = this.props;

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

  renderInviteDialog() {
    const { inviteOpen, email, lang } = this.state;
    const { width } = this.props;
    return (
      <Dialog
        open={inviteOpen}
        onClose={() => this.setState({ inviteOpen: false })}
        PaperProps={{
          style: {
            margin: 16
          }
        }}
      >
        <StyledCloseIcon onClick={() => this.setState({ inviteOpen: false })}>
          <img alt="Close" src={require("../images/Close.png")} />
        </StyledCloseIcon>
        <DialogTitle
          style={{ textAlign: "center", marginTop: 24, paddingBottom: 8 }}
        >
          {langConf[lang].inviteUser}
        </DialogTitle>
        <StyledDialogContent width={width} direction={langConf[lang].direction}>
          {this.renderInput("email", "email")}
          <StyledDivBtns>
            <div style={{ width: "50%", marginRight: 10, textAlign: "right" }}>
              <ButtonCancel
                style={{ position: "initial" }}
                onClick={() => this.setState({ inviteOpen: false })}
                className={"fontStyle1"}
              >
                {langConf[lang].cancel}
              </ButtonCancel>
            </div>
            <MyButton
              onClick={() => this.inviteUser()}
              disabled={!email}
              style={{ justifySelf: "right" }}
              width={90}
              height={36}
            >
              {langConf[lang].invite}
            </MyButton>
          </StyledDivBtns>
        </StyledDialogContent>
      </Dialog>
    );
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  inviteUser() {
    const { email, lang } = this.state;
    if (this.validateEmail(email)) {
      this.setState({ inviteOpen: false });
      //todo: add user invite
    } else {
      showSnackbar("error", langConf[lang].emailInvalid);
    }
  }

  render() {
    const { classes, width, data, user } = this.props;
    const { lang, screen } = this.state;

    const drawer = (
      <div>
        <div
          className={classes.toolbar}
          style={{ height: width > 600 ? 64 : 56 }}
        >
          <Logo
            id={"shelegLogo"}
            src={require(`../images/${
              lang === "hebrew" ? "logo.png" : "sheleg_Eng.jpg"
            }`)}
            alt={"sheleg"}
            direction={langConf[lang].direction}
          />
        </div>
        <Divider />
        <List style={{ direction: langConf[lang].direction }}>
          <ListItem
            onClick={() =>
              this.setState({
                screen: langConf[lang].mySuppliers,
                mobileOpen: false
              })
            }
            component={Link}
            to={"/suppliers"}
            button
          >
            <ListItemIcon>
              <SuppliersIcon />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: langConf[lang].right }}
              primary={langConf[lang].mySuppliers}
            />
          </ListItem>
          <ListItem
            onClick={() =>
              this.setState({
                screen: langConf[lang].receivedInvoices,
                mobileOpen: false
              })
            }
            component={Link}
            to={"/receivedInvoices"}
            button
          >
            <ListItemIcon>
              <ReceiveIcon />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: langConf[lang].right }}
              primary={langConf[lang].receivedInvoices}
            />
          </ListItem>
          <ListItem
            onClick={() =>
              this.setState({
                screen: langConf[lang].sentInvoices,
                mobileOpen: false
              })
            }
            component={Link}
            to={"/sentInvoices"}
            button
          >
            <ListItemIcon>
              <InvoiceIcon />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: langConf[lang].right }}
              primary={langConf[lang].sentInvoices}
            />
          </ListItem>
          <ListItem
            onClick={() =>
              this.setState({
                screen: langConf[lang].myClients,
                mobileOpen: false
              })
            }
            component={Link}
            to={"/clients"}
            button
          >
            <ListItemIcon>
              <ClientsIcon />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: langConf[lang].right }}
              primary={langConf[lang].myClients}
            />
          </ListItem>
          <ListItem
            onClick={() => this.setState({ inviteOpen: true, email: "" })}
            button
          >
            <ListItemIcon>
              <InviteIcon />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: langConf[lang].right }}
              primary={langConf[lang].inviteUser}
            />
          </ListItem>
          <ListItem
            onClick={() => this.logout()}
            component={Link}
            to={"/"}
            button
          >
            <ListItemIcon>
              <img src={require("../images/logout.svg")} alt={"logout"} />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: langConf[lang].right }}
              primary={langConf[lang].logout}
            />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{
            marginLeft:
              langConf[lang].direction === "ltr" && width > 600 ? 240 : "",
            marginRight:
              langConf[lang].direction === "rtl" && width > 600 ? 240 : ""
          }}
        >
          <Toolbar
            style={{
              direction: langConf[lang].direction,
              paddingRight: width > 600 ? 16 : 0,
              paddingLeft: width > 600 ? 16 : 0
            }}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              noWrap
              style={{ fontWeight: "bold" }}
              className={width > 600 ? "fontStyle24" : "fontStyle5"}
            >
              {screen}
            </Typography>
            <LangFormControl direction={langConf[lang].direction} width={width}>
              <Select
                value={lang}
                onChange={e => {
                  this.setLang(e.target.value);
                }}
                input={
                  <Input
                    style={{ width: 100, textAlign: "left" }}
                    name="lang"
                    id="lang"
                  />
                }
                name="lang"
                className={"fontStyle5"}
                inputprops={{
                  classes: {
                    input: "fontStyle5"
                  }
                }}
              >
                <MenuItem value={"hebrew"}>Hebrew</MenuItem>
                <MenuItem value={"english"}>English</MenuItem>
              </Select>
            </LangFormControl>
          </Toolbar>
        </AppBar>
        <nav>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={langConf[lang].direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paperAnchorLeft: classes.drawerPaperLtr,
                paperAnchorRight: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paperAnchorLeft: classes.drawerPaperLtr,
                paperAnchorRight: classes.drawerPaper
              }}
              anchor={langConf[lang].direction === "rtl" ? "right" : "left"}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main
          className={classes.content}
          style={{
            marginLeft:
              langConf[lang].direction === "ltr" && width > 600 ? 240 : "",
            marginRight:
              langConf[lang].direction === "rtl" && width > 600 ? 240 : ""
          }}
        >
          <div className={classes.toolbar} />
          <RoutesManager width={width} lang={lang} data={data} user={user} />
        </main>
        {this.renderInviteDialog()}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NavBar);
