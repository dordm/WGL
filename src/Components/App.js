import React, { Component } from "react";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";
import Login from "../Layouts/Login";
import { Auth } from "aws-amplify/lib/index";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import "../js/API";
import Loader from "./Loader";
import * as Sentry from "@sentry/browser";
import CustomizedSnackbar from "./CustomizedSnackbar";

Sentry.init({
  dsn: "https://2d1a0679c2a243feb0105fad407a4a69@sentry.io/1467358"
});

Amplify.configure({
  Auth: {
    identityPoolId: "us-west-2:05484f81-caf0-4627-a883-9dab23d572da",
    region: "us-west-2",
    userPoolId: "us-west-2_K6QNK8yVe",
    userPoolWebClientId: "6f7r9jaqg6pjcaqamagarq1628"
  }
});

export function setLoading(val) {
  this.setState({
    loading: val
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      user: null,
      data: null,
      loading: true
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    setLoading = setLoading.bind(this);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.getData();
    window.addEventListener("resize", this.updateDimensions);
  }

  getData() {
    this.setState({ loading: true });
    Auth.currentAuthenticatedUser()
      .then(async user => {
        window.AppApi.getData(
          user.attributes["custom:countryCode"],
          user.attributes["custom:id"]
        ).then(res => {
          this.setState({ data: res, loading: false });
        });
        this.setState({ user });
      })
      .catch(err => {});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { width, user, data, loading } = this.state;
    return (
      <div>
        <BrowserRouter>
          <CustomizedSnackbar />
          <div>
            <Loader size={50} open={loading} />
            <NavBar width={width} data={data} user={user} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default withAuthenticator(App, false, [<Login />]);
