import React, { useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import marker from '../../assets/marker.png'
const Mapbox = ReactMapboxGl({
  accessToken:
    "",
});

export default function Map(event) {
    const [popup, showPopup] = React.useState(false);
    console.log(event.props)
    if(event) {
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
    } else {
        return (
            <Mapbox
              style="mapbox://styles/mapbox/navigation-preview-day-v4"
              containerStyle={{
                height: "100vh",
                width: "100vw",
              }}>

              <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                <Feature
                  coordinates={[event.props.location.lon, event.props.location.lat]}/>
              </Layer>
    
            </Mapbox>
          );
    }
 
}
