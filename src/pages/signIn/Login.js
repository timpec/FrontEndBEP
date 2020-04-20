import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [errorMsgBoolean, setErrorMsgBoolean] = useState(false);
  const [redirect, changeRedirect] = useState(false);
  const [redirectRegister, changeRedirectRegister] = useState(false);

  // Removes the error message when user types into the username field
  function onUsernameChange(username) {
    setUsername(username.target.value);
    console.log(username.target.value);
    setLoginErrorMsg("");
    setErrorMsgBoolean(false);
  }

  // Validates login form
  function validateForm() {
    if (username === "") {
      setErrorMsgBoolean(true);
      setLoginErrorMsg(I18n.t("login.loginError"));
    } else {
      changeRedirect(true);
    }
  }

  // Sets redirection to true
  function redirectRegistering() {
    changeRedirectRegister(true);
  }

  // Handles redirection to feed page
  if (redirect) {
    return <Redirect push to="/MainFeed" />;
  }

  // Handles redirection to register page
  if (redirectRegister) {
    return <Redirect push to="/register" />;
  }

  return (
    <div className="login_container">
      <div className="login_box">
        <div className="login_LogoContainer">
        </div>

        <div className="login_signInText">{I18n.t("login.title")}</div>

        <hr className="login_line"></hr>

        <div className="login_inputContainers">
          <TextField
            label={I18n.t("login.usernameLabel")}
            className="login_inputs"
            type="text"
            name="username"
            placeholder={I18n.t("login.usernameLabel")}
            maxLength={20}
            onChange={onUsernameChange}
            error={errorMsgBoolean}
            helperText={loginErrorMsg}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="login_inputContainers">
          <TextField
            label={I18n.t("login.passwordLabel")}
            className="login_inputs"
            type="password"
            name="password"
            placeholder={I18n.t("login.passwordLabel")}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="login_btnContainer">
          <button
            type="button"
            className="login_btn"
            onClick={() => validateForm()}
          >
            {I18n.t("login.loginText")}
          </button>
        </div>

        <div className="login_noAccount">
          <button
            type="button"
            className="login_noAccountBtn"
            onClick={() => redirectRegistering()}
          >
            {I18n.t("login.noAccountText")}
          </button>
        </div>
      </div>
    </div>
  );
}
