import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import { MyButton } from "../Components/StyledComponents";
import { showSnackbar } from "../Components/CustomizedSnackbar";
import CustomizedSnackbar from "../Components/CustomizedSnackbar";
import Loader from "../Components/Loader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import classNames from "classnames";
import { Link, BrowserRouter } from "react-router-dom";
import "../js/API";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import langConf from "../js/lang";
import Utils from "../js/Utils";
import NumberFormatCustom from "../Components/NumberFormatCustom";
import * as Sentry from "@sentry/browser";

const signUpValidations = [
  {
    text: "validationLowerCase",
    valid: false
  },
  {
    text: "validationUpperCase",
    valid: false
  },
  {
    text: "validationNumber",
    valid: false
  },
  {
    text: "validationLength",
    valid: false
  }
];

const StyledLeftDiv = styled.div`
  display: flex;
  width: ${props => (props.width > 1050 ? "50%" : "100%")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-right: ${props => (props.width > 600 ? "20px" : "")};
  margin-top: ${props =>
    props.width > 1050 ? "" : props.width > 600 ? "20%" : "30%"};
`;

const StyledTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 15px;
  font-size: ${props =>
    props.width > 600 ? "30px !important" : "22px !important"};
`;

const StyledDivLogin = styled.div`
  height: 284px;
    width: ${props => (props.width > 600 ? "410px" : "320px")};
    background: #ffffff;
    display: flex;
    justify-content: flex-start
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

const StyledTxtFld = styled(TextField)`
  margin-top: 8px !important;
  width: ${props => (props.width > 600 ? "338px" : "250px")};
  height: 56px;
=`;

const StyledSelect = styled(Select)`
  margin-top: 35px;
  width: ${props => (props.width > 600 ? "338px" : "250px")};
`;

const StyledSignUp = styled.div`
  display: flex;
  margin-top: 30px;
`;

const DivActionWrapper = styled.div`
  background: white;
  margin-top: -30px;
`;

const LblForgetPwd = styled.label`
  margin-left: ${props => (props.direction === "ltr" ? "20px" : "0px")};
  margin-right: ${props => (props.direction === "rtl" ? "20px" : "0px")};
`;

const Logo = styled.img`
  position: absolute;
  right: ${props => (props.direction === "rtl" ? "10px" : "")};
  left: ${props => (props.direction === "ltr" ? "10px" : "")};
  top: 10px;
  height: 60px;
  width: 120px;
`;

const LangFormControl = styled(FormControl)`
  left: ${props =>
    props.direction === "rtl" ? (props.width > 600 ? "50%" : "10px") : ""};
  right: ${props =>
    props.direction === "ltr" ? (props.width > 600 ? "50%" : "10px") : ""};
  position: absolute !important;
  margin-top: 10px !important;
`;

const StyledInputLabel = styled(InputLabel)`
  left: ${props => (props.direction === "rtl" ? "unset" : "")} !important;
  right: ${props => (props.direction === "rtl" ? "-10px" : "")};
`;

const styles = {
  rightDiv: {
    width: "50%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `url(${require("../images/LoginImage.jpg")})`
  },
  blueLbl: {
    cursor: "pointer",
    textDecoration: "none"
  },
  lblErr: {
    marginTop: 5
  },
  lblForgetPwd: {
    marginLeft: 20
  },
  policy: {
    marginTop: 10
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 3,
    marginTop: 1.5
  },
  txtFldLbl: {
    right: 0,
    transformOrigin: "top right"
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      err: "",
      loading: false,
      forgotPwdStatus: "sendCode",
      code: "",
      email: "",
      country: "",
      countryCode: "",
      id: "",
      confirmPassword: "",
      username: "",
      userToChangePwd: null,
      height: window.innerHeight,
      width: window.innerWidth,
      signUpValidation: signUpValidations,
      displaySignUpValidation: false,
      lang: localStorage.getItem("language") || "hebrew",
      showPasswordLogin: false,
      showPasswordSignup: false,
      showPasswordChangePwd: false,
      showPasswordConfirmChangePwd: false,
      showPasswordForgotPwd: false,
      showPasswordConfirmForgotPwd: false
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate() {
    if (
      window.location.pathname === "/signup" &&
      this.props.authState !== "signUp"
    ) {
      localStorage.clear();
      this.props.onStateChange("signUp");
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    if (window.location.pathname === "/signup") {
      localStorage.clear();
      this.props.onStateChange("signUp");
    }
    if (window.location.pathname === "/signin") {
      localStorage.clear();
      this.props.onStateChange("signIn");
    }

    this.setState({
      country: this.state.lang === "hebrew" ? "Israel" : "United States",
      countryCode: this.state.lang === "hebrew" ? "972" : "1"
    });
  }

  signIn() {
    const { lang } = this.state;
    this.setState({ err: "", loading: true });
    const username = this.state.username.trim().toLowerCase();
    Auth.signIn(username, this.state.password)
      .then(user => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.props.onStateChange("changePassword");
          this.setState({
            loading: false,
            userToChangePwd: user,
            password: "",
            signUpValidation: signUpValidations,
            displaySignUpValidation: false
          });
        } else this.props.onStateChange("signedIn");
      })
      .catch(err => {
        const error = err.message != null ? err.message : err;
        if (error === "User is not confirmed.") {
          this.props.onStateChange("verifyContact");
          this.setState({ loading: false });
          showSnackbar("warning", langConf[lang].userNotConfirmed);
        } else if (error === "Password reset required for the user") {
          this.props.onStateChange("forgotPassword");
          this.setState({ loading: false });
        } else
          this.setState({
            err: error,
            loading: false
          });
      });
  }

  sendCode() {
    const { lang } = this.state;
    this.setState({ err: "", loading: true });
    Auth.forgotPassword(this.state.username.trim().toLowerCase())
      .then(data => {
        this.setState({
          forgotPwdStatus: "codeSent",
          loading: false,
          signUpValidation: signUpValidations,
          displaySignUpValidation: false
        });
        showSnackbar("success", langConf[lang].codeSent);
      })
      .catch(err =>
        this.setState({
          err: err.message != null ? err.message : err,
          loading: false
        })
      );
  }

  confirmCode() {
    const { lang } = this.state;
    this.setState({ err: "", loading: true });
    if (this.state.password === this.state.confirmPassword)
      Auth.forgotPasswordSubmit(
        this.state.username.trim().toLowerCase(),
        this.state.code,
        this.state.password
      )
        .then(data => {
          showSnackbar("success", langConf[lang].pwdUpdated);
          this.backToLogin();
        })
        .catch(err =>
          this.setState({
            err: err.message != null ? err.message : err,
            loading: false
          })
        );
    else
      this.setState({
        err: langConf[lang].notEqualPwd,
        loading: false
      });
  }

  backToLogin() {
    this.setState({
      code: "",
      forgotPwdStatus: "sendCode",
      loading: false,
      err: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
    this.props.onStateChange("signIn");
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signUp() {
    const { lang } = this.state;
    this.setState({ err: "", loading: true });
    const password = this.state.password;
    const username = this.state.username.trim();
    const id = this.state.id.trim();
    const country = this.state.country;
    const countryCode = this.state.countryCode;
    const email = this.state.email.trim();
    const emailValidation = this.validateEmail(email);
    if (id === "")
      this.setState({ err: langConf[lang].idInvalid, loading: false });
    else if (!emailValidation)
      this.setState({ err: langConf[lang].emailInvalid, loading: false });
    else {
      Auth.signUp({
        username: username,
        password,
        attributes: {
          email: email,
          "custom:country": country,
          "custom:id": id,
          "custom:countryCode": countryCode
        }
      })
        .then(data => {
          this.setState({
            password: "",
            email,
            username,
            err: "",
            loading: false
          });
          showSnackbar("info", langConf[lang].verifyUserCreation);
          this.props.onStateChange("verifyContact");
        })
        .catch(err => {
          const error = err.message != null ? err.message : err;
          this.setState({
            err:
              error !==
              "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6"
                ? error
                : "",
            loading: false
          });
        });
    }
  }

  pwdChanged(val, stateParameter) {
    let validations = this.state.signUpValidation;
    const reNumber = /[0-9]/,
      reLowercase = /[a-z]/,
      reUppercase = /[A-Z]/;
    if (val !== "") {
      validations[0].valid = reLowercase.test(val);
      validations[1].valid = reUppercase.test(val);
      validations[2].valid = reNumber.test(val);
      validations[3].valid = val.length >= 8;
    }
    this.setState({
      displaySignUpValidation: val !== "",
      [stateParameter]: val,
      signUpValidation: validations
    });
  }

  renderNumberInput(label, stateParameter) {
    const { lang } = this.state;
    return (
      <StyledTxtFld
        onChange={e => this.setState({ [stateParameter]: e.target.value })}
        className={"fontStyle5"}
        width={this.state.width}
        value={this.state[stateParameter]}
        id={label}
        label={label}
        type={"text"}
        InputProps={{
          classes: {
            input: "fontStyle5"
          },
          inputComponent: NumberFormatCustom
        }}
        InputLabelProps={{
          classes: {
            root: classNames(
              "fontStyle4",
              langConf[lang].direction === "rtl"
                ? this.props.classes.txtFldLbl
                : {}
            )
          }
        }}
      />
    );
  }

  renderInput(label, stateParameter, fieldType, showPwdFldName = "") {
    const { lang } = this.state;
    return (
      <StyledTxtFld
        onChange={e => this.setState({ [stateParameter]: e.target.value })}
        className={"fontStyle5"}
        width={this.state.width}
        value={this.state[stateParameter]}
        id={label}
        label={label}
        type={
          showPwdFldName !== ""
            ? this.state[showPwdFldName]
              ? "text"
              : "password"
            : fieldType
        }
        InputProps={{
          classes: {
            input: "fontStyle5"
          },
          endAdornment:
            showPwdFldName !== "" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() =>
                    this.setState({
                      [showPwdFldName]: !this.state[showPwdFldName]
                    })
                  }
                >
                  {this.state[showPwdFldName] ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            )
        }}
        InputLabelProps={{
          classes: {
            root: classNames(
              "fontStyle4",
              langConf[lang].direction === "rtl"
                ? this.props.classes.txtFldLbl
                : {}
            )
          }
        }}
      />
    );
  }

  renderPasswordInput(label, stateParameter, showPwdFldName = "") {
    const { lang } = this.state;
    return (
      <StyledTxtFld
        onChange={e => this.pwdChanged(e.target.value, stateParameter)}
        className={"fontStyle5"}
        width={this.state.width}
        value={this.state[stateParameter]}
        id={label}
        label={label}
        type={
          showPwdFldName !== ""
            ? this.state[showPwdFldName]
              ? "text"
              : "password"
            : "password"
        }
        InputProps={{
          classes: {
            input: "fontStyle5"
          },
          endAdornment:
            showPwdFldName !== "" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() =>
                    this.setState({
                      [showPwdFldName]: !this.state[showPwdFldName]
                    })
                  }
                >
                  {this.state[showPwdFldName] ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            )
        }}
        InputLabelProps={{
          classes: {
            root: classNames(
              "fontStyle4",
              langConf[lang].direction === "rtl"
                ? this.props.classes.txtFldLbl
                : {}
            )
          }
        }}
      />
    );
  }

  signUpLayout() {
    const { classes } = this.props;
    const { width, displaySignUpValidation, lang, country } = this.state;
    return (
      <StyledLeftDiv width={width}>
        <div>
          <CustomizedSnackbar />
          <StyledTitle width={width} className={"fontStyle34"}>
            {langConf[lang].signup}
          </StyledTitle>
          <StyledDivLogin
            width={width}
            style={{ height: displaySignUpValidation ? 500 : 400 }}
          >
            {this.renderInput(
              langConf[lang].username + " *",
              "username",
              "text"
            )}
            {this.renderInput(langConf[lang].email + " *", "email", "text")}
            {this.renderNumberInput(langConf[lang].compHP + " *", "id")}
            <FormControl style={{ marginBottom: 8 }}>
              <StyledInputLabel
                direction={langConf[lang].direction}
                className={"fontStyle4"}
                htmlFor="country"
              >
                {langConf[lang].country + " *"}
              </StyledInputLabel>
              <StyledSelect
                value={country}
                width={width}
                className={"fontStyle5"}
                input={<Input id="country" name={"country"} />}
                onChange={e =>
                  this.setState({
                    country: e.target.value,
                    countryCode: Utils.getCountryCode(e.target.value)
                  })
                }
                inputprops={{
                  id: "country",
                  classes: {
                    input: "fontStyle5"
                  }
                }}
                classes={{
                  select:
                    langConf[lang].direction === "rtl" ? "selectTextRtl" : "",
                  icon:
                    langConf[lang].direction === "rtl" ? "selectArrowRtl" : ""
                }}
              >
                {Utils.getCountries().map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
            {this.renderPasswordInput(
              langConf[lang].password + " *",
              "password",
              "showPasswordSignup"
            )}
            {this.renderValidations()}
            <MyButton
              onClick={() => this.signUp()}
              style={{ marginTop: 24 }}
              height={48}
              width={138}
              component={Link}
              to={"/"}
            >
              {langConf[lang].signup}
            </MyButton>
          </StyledDivLogin>
        </div>
        <StyledSignUp className={"fontStyle7"}>
          {langConf[lang].alreadyHaveAccount}
          &nbsp;
          <Typography
            onClick={() => this.lblSignInClick()}
            className={classNames(classes.blueLbl, "fontStyle22")}
            component={Link}
            style={{ marginTop: -2 }}
            to={"/"}
          >
            {langConf[lang].signin}
          </Typography>
        </StyledSignUp>
      </StyledLeftDiv>
    );
  }

  lblSignInClick() {
    this.setState({
      username: "",
      password: "",
      err: "",
      code: ""
    });
    this.props.onStateChange("signIn");
  }

  verifyCode() {
    const {
      lang,
      username,
      code,
      country,
      countryCode,
      email,
      id
    } = this.state;
    this.setState({ err: "", loading: true });
    Auth.confirmSignUp(username, code, {})
      .then(data => {
        window.AppApi.postBusinessData({
          businessCountry: country,
          businessCity: "",
          businessEmail: email,
          businessMobile: "",
          businessName: username,
          businessRegion: "",
          businessStreet: "",
          businessTaxNumber: id,
          countryCode: countryCode
        }).then(res => {
          this.setState({
            code: "",
            err: "",
            loading: false
          });
          showSnackbar("success", langConf[lang].userVerified);
          this.props.onStateChange("signIn");
        });
      })
      .catch(err => {
        this.setState({
          err: err.message != null ? err.message : err,
          loading: false
        });
      });
  }

  verifySignupLayout() {
    const { classes } = this.props;
    const { width, err, loading, lang } = this.state;
    return (
      <StyledLeftDiv width={width}>
        <div style={{ marginTop: -20 }}>
          <CustomizedSnackbar />
          <StyledTitle width={width} className={"fontStyle34"}>
            {langConf[lang].verifySignup}
          </StyledTitle>
          <StyledDivLogin style={{ height: 200 }} width={width}>
            {this.renderInput(langConf[lang].verificationCode, "code", "text")}
            {err !== "" ? (
              <label className={classNames(classes.lblErr, "fontStyle23")}>
                {err}
              </label>
            ) : (
              ""
            )}
            <MyButton
              onClick={() => this.verifyCode()}
              style={{
                marginTop: err === "" && !loading ? 36 : 15
              }}
              height={48}
              width={163}
            >
              {langConf[lang].verifyCode}
            </MyButton>
          </StyledDivLogin>
        </div>
        <StyledSignUp className={"fontStyle7"}>
          {langConf[lang].alreadyHaveAccount}
          &nbsp;
          <label
            onClick={() => this.lblSignInClick()}
            className={classNames(classes.blueLbl, "fontStyle22")}
          >
            {langConf[lang].signin}
          </label>
        </StyledSignUp>
      </StyledLeftDiv>
    );
  }

  forgotPwd() {
    const { classes } = this.props;
    const { err, width, lang } = this.state;
    return (
      <div style={{ marginTop: -20 }}>
        <StyledTitle className={"fontStyle34"} width={width}>
          {langConf[lang].forgotPassword}
        </StyledTitle>
        <StyledDivLogin style={{ height: 200 }} width={width}>
          {this.renderInput(langConf[lang].username, "username", "text")}
          {err !== "" ? (
            <label className={classNames(classes.lblErr, "fontStyle23")}>
              {err}
            </label>
          ) : (
            ""
          )}
          <MyButton
            onClick={() => this.sendCode()}
            style={{
              marginTop: 24
            }}
            height={48}
            width={163}
          >
            {langConf[lang].restorePwd}
          </MyButton>
        </StyledDivLogin>
        <DivActionWrapper>
          <LblForgetPwd
            onClick={() => this.backToLogin()}
            className={classNames(classes.blueLbl, "fontStyle22")}
            direction={langConf[lang].direction}
          >
            {langConf[lang].backLogin}
          </LblForgetPwd>
        </DivActionWrapper>
      </div>
    );
  }

  changePwd() {
    const { lang } = this.state;
    this.setState({ err: "", loading: true });
    const user = this.state.userToChangePwd;
    const pwd = this.state.password;
    if (pwd !== this.state.confirmPassword)
      this.setState({
        err: "New Password and Confirm Password are not equal",
        loading: false
      });
    else {
      Auth.completeNewPassword(user, pwd, {})
        .then(data => {
          this.setState({
            userToChangePwd: null,
            password: "",
            confirmPassword: "",
            loading: false
          });
          showSnackbar("success", langConf[lang].pwdUpdated);
          this.props.onStateChange("signIn");
        })
        .catch(err => {
          this.setState({
            err: err.message != null ? err.message : err,
            loading: false
          });
        });
    }
  }

  changePwdLayout() {
    const { classes } = this.props;
    const { displaySignUpValidation, width, lang } = this.state;
    return (
      <div style={{ marginTop: -20 }}>
        <StyledTitle width={width} className={"fontStyle34"}>
          {langConf[lang].changePwd}
        </StyledTitle>
        <StyledDivLogin
          style={{ height: displaySignUpValidation ? 344 : 284 }}
          width={width}
        >
          {this.renderPasswordInput(
            langConf[lang].newPassword,
            "password",
            "showPasswordChangePwd"
          )}
          {this.renderInput(
            langConf[lang].confirmPassword,
            "confirmPassword",
            "password",
            "showPasswordConfirmChangePwd"
          )}
          {this.renderValidations()}
          <MyButton
            onClick={() => this.changePwd()}
            style={{
              marginTop: 24
            }}
            height={48}
            width={163}
          >
            {langConf[lang].confirm}
          </MyButton>
        </StyledDivLogin>
        <DivActionWrapper>
          <LblForgetPwd
            onClick={() => this.backToLogin()}
            className={classNames(classes.blueLbl, "fontStyle22")}
            direction={langConf[lang].direction}
          >
            {langConf[lang].backLogin}
          </LblForgetPwd>
        </DivActionWrapper>
      </div>
    );
  }

  renderValidations() {
    const { classes } = this.props;
    const { displaySignUpValidation, err, signUpValidation, lang } = this.state;
    return displaySignUpValidation ? (
      <div style={{ marginTop: 5 }}>
        {err !== "" ? (
          <div style={{ display: "flex" }}>
            <ClearIcon nativeColor={"#ff0000"} className={classes.icon} />
            <Typography className={"fontStyle23"}>{err}</Typography>
          </div>
        ) : (
          ""
        )}
        {signUpValidation.map((item, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              {item.valid ? (
                <DoneIcon nativeColor={"#2FD565"} className={classes.icon} />
              ) : (
                <ClearIcon nativeColor={"#ff0000"} className={classes.icon} />
              )}
              <Typography
                className={item.valid ? "fontStyle25" : "fontStyle23"}
              >
                {langConf[lang][item.text]}
              </Typography>
            </div>
          );
        })}
      </div>
    ) : (
      ""
    );
  }

  forgotPwdStep2() {
    const { classes } = this.props;
    const { displaySignUpValidation, width, lang } = this.state;
    return (
      <div style={{ marginTop: -20 }}>
        <StyledTitle className={"fontStyle34"} width={width}>
          {langConf[lang].forgotPassword}
        </StyledTitle>
        <StyledDivLogin
          style={{ height: displaySignUpValidation ? 400 : 340 }}
          width={width}
        >
          {this.renderInput("Code", "code", "text")}
          {this.renderPasswordInput(
            langConf[lang].newPassword,
            "password",
            "showPasswordForgotPwd"
          )}
          {this.renderInput(
            langConf[lang].confirmPassword,
            "confirmPassword",
            "password",
            "showPasswordConfirmForgotPwd"
          )}
          {this.renderValidations()}
          <MyButton
            onClick={() => this.confirmCode()}
            style={{
              marginTop: 24
            }}
            height={48}
            width={163}
          >
            {langConf[lang].confirm}
          </MyButton>
        </StyledDivLogin>
        <DivActionWrapper>
          <LblForgetPwd
            onClick={() => this.backToLogin()}
            className={classNames(classes.blueLbl, "fontStyle22")}
            direction={langConf[lang].direction}
          >
            {langConf[lang].backLogin}
          </LblForgetPwd>
        </DivActionWrapper>
      </div>
    );
  }

  forgetPwdClick() {
    this.setState({ err: "", password: "" });
    this.props.onStateChange("forgotPassword");
  }

  enterPressed(event) {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      this.signIn();
    }
  }

  divLogin() {
    const { classes } = this.props;
    const { width, err, lang } = this.state;
    return (
      <div onKeyPress={this.enterPressed.bind(this)} style={{ marginTop: -20 }}>
        <StyledTitle width={width} className={"fontStyle34"}>
          {langConf[lang].loginToSystem}
        </StyledTitle>
        <StyledDivLogin width={width}>
          {this.renderInput(langConf[lang].username, "username", "text")}
          {this.renderInput(
            langConf[lang].password,
            "password",
            "password",
            "showPasswordLogin"
          )}
          {err !== "" ? (
            <label className={classNames(classes.lblErr, "fontStyle23")}>
              {err}
            </label>
          ) : (
            ""
          )}
          <MyButton
            onClick={() => this.signIn()}
            id={"btnLogin"}
            style={{
              marginTop: 24
            }}
            height={48}
            width={163}
          >
            {langConf[lang].login}
          </MyButton>
        </StyledDivLogin>
        <DivActionWrapper>
          <LblForgetPwd
            onClick={() => this.forgetPwdClick()}
            direction={langConf[lang].direction}
            className={classNames(classes.blueLbl, "fontStyle22")}
          >
            {langConf[lang].forgotPwd}
          </LblForgetPwd>
        </DivActionWrapper>
      </div>
    );
  }

  lblSignUpClick() {
    this.setState({
      username: "",
      password: "",
      err: "",
      code: "",
      signUpValidation: signUpValidations,
      displaySignUpValidation: false
    });
    this.props.onStateChange("signUp");
  }

  setLang(lang) {
    this.setState({ lang });
    localStorage.setItem("language", lang);
  }

  render() {
    const { classes, authState } = this.props;
    const { width, forgotPwdStatus, loading, lang } = this.state;
    return (
      <BrowserRouter>
        <div style={{ direction: langConf[lang].direction }}>
          {authState === "signedIn" || authState === "loading" ? (
            ""
          ) : (
            <div style={{ display: "flex", position: "relative" }}>
              <Logo
                id={"shelegLogo"}
                src={require(`../images/${
                  lang === "hebrew" ? "logo.png" : "sheleg_Eng.jpg"
                }`)}
                alt={"sheleg"}
                direction={langConf[lang].direction}
              />
              <LangFormControl
                direction={langConf[lang].direction}
                width={width}
              >
                <InputLabel className={"fontStyle4"} shrink htmlFor="lang">
                  Language
                </InputLabel>
                <StyledSelect
                  width={this.state.width}
                  value={this.state.lang}
                  onChange={e => this.setLang(e.target.value)}
                  input={
                    <Input
                      style={{ width: 100, textAlign: "left" }}
                      name="lang"
                      id="lang"
                    />
                  }
                  displayEmpty
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
                </StyledSelect>
              </LangFormControl>
              {authState === "signUp" || authState === "verifyContact" ? (
                authState === "signUp" ? (
                  this.signUpLayout()
                ) : (
                  this.verifySignupLayout()
                )
              ) : (
                <StyledLeftDiv width={width}>
                  {authState === "signIn"
                    ? this.divLogin()
                    : authState === "changePassword"
                      ? this.changePwdLayout()
                      : forgotPwdStatus === "sendCode"
                        ? this.forgotPwd()
                        : this.forgotPwdStep2()}
                  <StyledSignUp className={"fontStyle7"}>
                    {langConf[lang].dontHaveAccount}
                    &nbsp;
                    <label
                      onClick={() => this.lblSignUpClick()}
                      className={classNames(classes.blueLbl, "fontStyle22")}
                    >
                      {langConf[lang].signup}
                    </label>
                  </StyledSignUp>
                </StyledLeftDiv>
              )}
              {width > 1050 ? <div className={classes.rightDiv} /> : ""}
            </div>
          )}
          <CustomizedSnackbar />
          <Loader size={50} open={loading} />
        </div>
      </BrowserRouter>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
