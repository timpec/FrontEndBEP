import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import I18n from "../../components/Element/LanguageSwticher/I18n";

const sideDrawer = props => {
  let drawAnim = "sideDrawer";
  if (props.show) {
    drawAnim = "sideDrawer open";
  }

  return (
    <nav className={drawAnim}>
      <ul>
        <Link to="/Test">
          <li className="first">
            <div onClick={props.closeDraw}>{"jotain"}</div>
          </li>
        </Link>
        <Link to="/Test">
          <li>
            <div onClick={props.closeDraw}>{"jotain"}</div>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export default sideDrawer;
