import React, { Component } from "react";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";
import Login from "../Layouts/Login";
import { Auth } from "aws-amplify/lib/index";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import "../js/API";
import Loader from "./Loader";

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
      user: null,
      data: null,
      loading: true
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    // Auth.currentAuthenticatedUser()
    //   .then(async user => {
    //     setTimeout(
    //       () =>
    //         window.AppApi.getData().then(res => {
    //           this.setState({ data: res, loading: false });
    //         }),
    //       1000
    //     );
    //     this.setState({ user });
    //   })
    //   .catch(err => {});

      setTimeout(
          () =>
              window.AppApi.getData().then(res => {
                  this.setState({ data: res, loading: false });
              }),
          1000
      );

    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { width, user, data, loading } = this.state;
    return (
      <div>
        <BrowserRouter>
          <div>
            <Loader size={50} open={loading} />
            <NavBar width={width} data={data} user={user} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
// export default withAuthenticator(App, false, [<Login />]);
