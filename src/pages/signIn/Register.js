// Register page to register new users
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Register.css";
import {postRegister} from "../../services/graphqlService"

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorMsgBoolean, setEmailErrorMsgBoolean] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(""); 

  const [redirectFeed, changeRedirectFeed] = useState(false);
  const [redirectLogin, changeRedirectLogin] = useState(false);

  // Custom email format checker
  const validEmailCheck = () => {
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

  // Register a new user if all fields are correct
  const registerAttempt = async () => {
    if (validEmail === true) {
      const user = await postRegister(username,password,address,email)
      if (user === true) {
        redirectToMain()
      } else {
        setRegisterErrorMsg(I18n.t("register.registerError"));
      }
    } else {
      setRegisterErrorMsg(I18n.t("register.registerErrorEmail"));
    }
  }

  const redirectToLogin = () => {
    changeRedirectLogin(true);
  }
  const redirectToMain = () => {
    changeRedirectFeed(true);
  }
  if (redirectFeed) {
    return <Redirect push to="/MainFeed" />;
  }
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
        <div className="error_alert">
          <h5>{registerErrorMsg}</h5>
        </div>

        <div className="register_inputContainers">
          <TextField
            label={I18n.t("register.usernameLabel")}
            className="register_inputs"
            type="text"
            name="username"
            placeholder={I18n.t("register.usernameLabel")}
            maxLength={20}
            onChange={username => setUsername(username.target.value)}
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
            label={I18n.t("register.addressLabel")}
            className="register_inputs"
            type="text"
            name="address"
            value={address}
            onChange={address => setAddress(address.target.value)}
            placeholder={I18n.t("register.addressLabel")}
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
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="register_btnContainer">
          <button
            type="button"
            className="register_btn"
            onClick={() => registerAttempt()}
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
