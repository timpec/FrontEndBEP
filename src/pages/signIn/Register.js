import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Register.css";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [usernameErrorMsgBoolean, setUsernameErrorMsgBoolean] = useState(false);
  const [emailErrorMsgBoolean, setEmailErrorMsgBoolean] = useState(false);
  const [passwordErrorMsgBoolean, setPasswordErrorMsgBoolean] = useState(false);

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [redirectFeed, changeRedirectFeed] = useState(false);
  const [redirectLogin, changeRedirectLogin] = useState(false);

  // Removes username error message when user has typed more than 3 characters in the username field
  function onUsernameChange(username) {
    setUsername(username.target.value);
    if (username.target.value.length >= 3) {
      setUsernameErrorMsg("");
    }
  }

  // Checks that the username is over 3 characters
  function validUsernameCheck() {
    if (username.length < 3) {
      setUsernameErrorMsg(I18n.t("register.usernameError"));
      setValidUsername(false);
      setUsernameErrorMsgBoolean(true);
    } else {
      setValidUsername(true);
      setUsernameErrorMsgBoolean(false);
    }
  }

  // Checks that the email is in valid format
  function validEmailCheck() {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexp.test(email) !== true) {
      setEmailErrorMsg(I18n.t("register.emailError"));
      setValidEmail(false);
      setEmailErrorMsgBoolean(true);
    } else {
      setEmailErrorMsgBoolean(false);
      setEmailErrorMsg("");
      setValidEmail(true);
    }
  }

  // Checks that the passwords are same and that the passowrd is longer than 8 character
  function passwordCheck() {
    if (password !== rePassword) {
      setPasswordErrorMsg(I18n.t("register.notSamePassError"));
      setPasswordErrorMsgBoolean(true);
      return false;
    } else {
      setPasswordErrorMsg("");
      if (password.length < 8) {
        setPasswordErrorMsgBoolean(true);
        setPasswordErrorMsg(I18n.t("register.passLengthError"));
        return false;
      } else {
        setPasswordErrorMsgBoolean(false);
        return true;
      }
    }
  }

  // Validates register form
  function validateForm() {
    passwordCheck();
    validUsernameCheck();
    validEmailCheck();
    if (
      validEmail === true &&
      passwordCheck() === true &&
      validUsername === true
    ) {
      changeRedirectFeed(true);
    } else {
    }
  }

  // Changes redirection for login page to true
  function redirectToLogin() {
    changeRedirectLogin(true);
  }

  // Handles navigation for feed page
  if (redirectFeed) {
    return <Redirect push to="/feed" />;
  }

  // Handles navigation for login page
  if (redirectLogin) {
    return <Redirect push to="/login" />;
  }

  return (
    <div className="register_container">
      <div className="register_box">
        <div className="register_LogoContainer">
        </div>

        <div className="register_signUpText">{I18n.t("register.title")}</div>

        <hr className="register_line"></hr>

        <div className="register_inputContainers">
          <TextField
            label={I18n.t("register.usernameLabel")}
            className="register_inputs"
            type="text"
            name="username"
            placeholder={I18n.t("register.usernameLabel")}
            maxLength={20}
            onBlur={validUsernameCheck}
            onChange={onUsernameChange}
            error={usernameErrorMsgBoolean}
            helperText={usernameErrorMsg}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="register_inputContainers">
          <TextField
            label={I18n.t("register.emailLabel")}
            className="register_inputs"
            type="email"
            name="email"
            placeholder={I18n.t("register.emailLabel")}
            value={email}
            onBlur={validEmailCheck}
            onChange={email => setEmail(email.target.value)}
            error={emailErrorMsgBoolean}
            helperText={emailErrorMsg}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="register_inputContainers">
          <TextField
            label={I18n.t("register.passwordLabel")}
            className="register_inputs"
            type="password"
            name="password"
            value={password}
            onChange={password => setPassword(password.target.value)}
            placeholder={I18n.t("register.passwordLabel")}
            error={passwordErrorMsgBoolean}
            helperText={passwordErrorMsg}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="register_inputContainers">
          <TextField
            label={I18n.t("register.rePasswordLabel")}
            className="register_inputs"
            type="password"
            name="rePassword"
            value={rePassword}
            onChange={rePassword => setRePassword(rePassword.target.value)}
            placeholder={I18n.t("register.rePasswordLabel")}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="register_btnContainer">
          <button
            type="button"
            className="register_btn"
            onClick={() => validateForm()}
          >
            {I18n.t("register.registerText")}
          </button>
        </div>

        <div className="register_haveAccount">
          <button
            type="button"
            className="register_haveAccountBtn"
            onClick={() => redirectToLogin()}
          >
            {I18n.t("register.alrdyHaveAccountText")}
          </button>
        </div>
      </div>
    </div>
  );
}
