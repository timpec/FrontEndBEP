import React from "react";
import moment from "moment"
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function MainCard(props) {
    return (
        <div>
        <h5 className="p-2 bd-highlight">Example routes currently</h5>
             <div className="d-flex flex-column bd-highlight">
             <Accordion >
        
        {props.routes.map((route) => (
      <Card>

      <Card.Header>
      <Accordion.Toggle as={Card.Header} eventKey="0">
       {Math.round(route.duration / 60) +" minutes"}
      </Accordion.Toggle>
    </Card.Header>
          <div key={Math.random(0,100)} className="card border-primary flex-row">  
          {route.legs.map((leg,index) => (
             <Accordion.Collapse eventKey={index +1}>
             <Card.Body><div key={Math.random(0,100)} className="d-flex flex-column bd-highlight">
              <p className="p-1 bd-highlight">{leg.mode}</p>
            </div></Card.Body>
           </Accordion.Collapse>
            
          ))}
          </div>
          </Card>
        ))}
          </Accordion>
          </div>
          </div>
    )
}