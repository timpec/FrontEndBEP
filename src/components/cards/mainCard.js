import React from "react";
import moment from "moment"

export default function MainCard(props) {
    return (
        <div className="d-flex flex-row bd-highlight p-3">
        <div className="d-flex flex-column bd-highlight p-3">
        <div className="p-2 bd-highlight">{moment(new Date(parseInt(props.starting_day)).toString()).subtract(0, 'days').calendar() +""+ (props.ending_day ? "-"+moment(new Date(parseInt(props.ending_day)).toString()).calendar() : "")}</div>
        <div className="p-2 bd-highlight">{props.address}</div>
        </div>
        </div>
    )
}