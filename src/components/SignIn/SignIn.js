import React, { Component } from "react";
import "./SignIn.scss";

import Button from "../forms/Button/Button";
import { signInWithGoogle } from "../../firebase/utils";

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="signIn">
        <div className="wrapper">
          <h2>Log In</h2>
          <div className="formWrapper">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
