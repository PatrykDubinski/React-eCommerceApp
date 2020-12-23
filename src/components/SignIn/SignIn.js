import React, { useState } from "react";
import "./SignIn.scss";
import { Link, withRouter } from "react-router-dom";

import Button from "../forms/Button/Button";
import { auth, signInWithGoogle } from "../../firebase/utils";
import FormInput from "../forms/FormInput/FormInput";
import AuthWrapper from "../AuthWrapper/AuthWrapper";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Log in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Your email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Your password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log In</Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
