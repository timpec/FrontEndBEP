import React from "react";
import moment from "moment"

export default function weatherCard(props) {

    return (
        <div className="d-flex flex-column bd-highlight p-3">
            {props.daysWeather.map((daysWeather) => (
                <div key={daysWeather.ts} className="d-flex w-auto flex-row justify-content-between bd-highlight p-3 ">
                <div className="p-1 bd-highlight">{moment(new Date(parseInt(daysWeather.ts * 1000)).toString()).subtract(0, 'days').calendar()}</div>
                <div className="d-flex flex-column bd-highlight mb-3">
                <img alt="weather" className="imageIcon" height="30" width="30" id="imageIcon" src={"https://www.weatherbit.io/static/img/icons/"+daysWeather.weather.icon+".png"}></img>
                <h5 className="p-1 bd-highlight">{daysWeather.temp+ "°C"}</h5>
                </div>
                </div>
            ))}
          </div>
    )
}