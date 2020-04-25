import React from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import marker from '../../assets/marker.png'
import { events } from "react-mapbox-gl/lib/map-events";
const Mapbox = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_MAPBOX_API,
});

export default function Map(event) {
    const [popup, showPopup] = React.useState(false);
    if(event.props) {
        return (
            <Mapbox
              style="mapbox://styles/mapbox/navigation-preview-day-v4"
              containerStyle={{
                height: "50vh",
                width: "100vw",
              }}
              zoom={[13]}
              center={[event.props.location.lon, event.props.location.lat]}>

              {popup ? 
            <Popup
            coordinates={[event.props.location.lon,event.props.location.lat]}
            offset={{'bottom': [0, -18]}}>
            <ul className="list-group">
            <div className="d-flex flex-column bd-highlight mb-3">
            <h4 className="p-2 bd-highlight">
            {event.props.location.address.street_address}
            </h4>
            </div>
            </ul>
          </Popup>:
            <div></div>  
            }
              <Marker
                coordinates={[event.props.location.lon, event.props.location.lat]}
                anchor="bottom" onClick={((item) => showPopup(true))}>
                <img src={marker}/>
                
              </Marker>
            </Mapbox>
          );
    } else if(events.events) {
      return (
        <Mapbox
          style="mapbox://styles/mapbox/navigation-preview-day-v4"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}>

          {}
        </Mapbox>
      );
    } else {
        return (
            <Mapbox
              style="mapbox://styles/mapbox/navigation-preview-day-v4"
              containerStyle={{
                height: "100vh",
                width: "100vw",
              }}>
    
            </Mapbox>
          );
    }
 
}
