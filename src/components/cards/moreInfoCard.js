import React from "react";

export default function MainCard(props) {
    return (
        <div className="d-flex flex-row bd-highlight p-3">
        <div className="d-flex flex-column bd-highlight p-3">
        <p>{props.moreInfo}</p>
        </div>
        </div>
    )
}