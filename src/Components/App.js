import React, { Component } from "react";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";
import Login from "../Layouts/Login";
import { Auth } from "aws-amplify/lib/index";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

Amplify.configure({
  Auth: {
    identityPoolId: "us-west-2:05484f81-caf0-4627-a883-9dab23d572da",
    region: "us-west-2",
    userPoolId: "us-west-2_K6QNK8yVe",
    userPoolWebClientId: "6f7r9jaqg6pjcaqamagarq1628"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      user: null
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(async user => {
        this.setState({ user });
      })
      .catch(err => {});

    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { width, user } = this.state;
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar width={width} user={user} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default withAuthenticator(App, false, [<Login />]);
