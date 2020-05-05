import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function MainCard(props) {
  
  return (
    <div>
      <h5 className="p-2 bd-highlight">Example routes currently</h5>
      <div className="d-flex flex-column bd-highlight">
        <Accordion>
          {props.routes.map((route,index) => (
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  {Math.round(route.duration / 60) + " minutes"}
                </Accordion.Toggle>
              </Card.Header>
              {route.legs.map((leg) => (
                <Accordion.Collapse eventKey={index} >
                  <Card.Body>
                      <div className="p-0 m-0 d-flex justify-content-center">
                      {route.legs[0].startTime === leg.startTime ? <p className="m-1 p-1 badge badge-pill badge-success">Start</p> :<p></p>}
                      {route.legs[route.legs.length - 1].startTime === leg.startTime ? <p className="m-1 p-1 badge badge-pill badge-success">End</p>:<p></p>}
                      <p className="badge badge-pill badge-primary">{leg.mode}</p>
                      </div>
                  </Card.Body>
                </Accordion.Collapse>
                ))}
            </Card>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
