import React from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Profile.css";
import {getUser} from '../../services/graphqlService';

export default function Profile() {

    const placeholder = async () => {
        const id = localStorage.getItem('userid')
        const user = await getUser(id)
        console.log(user)
    }




    return (
        <div>
            <h1>Profile</h1>

            <div className="logout_btnContainer">
                <button
                type="button"
                className="logout_btn"
                onClick={() => placeholder()}>
            {I18n.t("profile.logoutButton")}
          </button>
        </div>
        </div>

    )
}