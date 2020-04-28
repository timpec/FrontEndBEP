import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Login.css";
import {postLogin} from '../../services/graphqlService';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState(""); 
  const [redirect, changeRedirect] = useState(false);
  const [redirectRegister, changeRedirectRegister] = useState(false);

  const onUsernameChange = (username) => {
    setUsername(username.target.value);
    console.log(username.target.value);
    setLoginErrorMsg("");
  }

  const onPwChange = (password) => {
    setPassword(password.target.value);
  }

  const loginAttempt = async () => {
    const user = await postLogin(username,password)
    console.log(user)
    if (user === true) {
      console.log("true")
      changeRedirect(true);
    } else {
      setLoginErrorMsg(I18n.t("login.loginError"));
    }
  }

  const redirectRegistering = () => {
    changeRedirectRegister(true);
  }
  if (redirect) {
    return <Redirect push to="/MainFeed" />;
  }
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
        <div className="error_alert">
          <h5>{loginErrorMsg}</h5>
        </div>

        <div className="login_inputContainers">
          <TextField
            label={I18n.t("login.usernameLabel")}
            className="login_inputs"
            type="text"
            name="username"
            placeholder={I18n.t("login.usernameLabel")}
            onChange={onUsernameChange}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="login_inputContainers">
          <TextField
            label={I18n.t("login.passwordLabel")}
            className="login_inputs"
            type="password"
            name="password"
            onChange={onPwChange}
            placeholder={I18n.t("login.passwordLabel")}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>

        <div className="login_btnContainer">
          <button
            type="button"
            className="login_btn"
            onClick={() => loginAttempt()}
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
