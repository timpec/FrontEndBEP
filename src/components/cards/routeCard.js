import React from "react";
import moment from "moment"

export default function MainCard(props) {
    return (
        <div>
        <h5 className="p-2 bd-highlight">Example routes currently</h5>
        <ul className="list-group">
        {props.routes.map((route) => (
          <div  key={Math.random(0,100)} className="card border-primary flex-column bd-highlight mb-1 list-group-item">  
          <p>{Math.round(route.duration / 60)} minutes</p>
          {route.legs.map((leg) => (
            <div key={Math.random(0,100)} className="d-flex flex-row bd-highlight mb-3">
              <p className="p-2 bd-highlight">{leg.mode}</p>
              <p className="p-2 bd-highlight">{Math.round(leg.distance)} meters</p>

            </div>
          ))}
          </div>
        ))}
          </ul>
          </div>
    )
}