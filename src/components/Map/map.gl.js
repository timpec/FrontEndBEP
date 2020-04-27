import React,{ useEffect, useState } from "react";
import ReactMapboxGl, { Marker, Popup, Layer, Feature } from "react-mapbox-gl";
import marker1 from '../../assets/marker.png'
import { marker } from './marker';
import { events } from "react-mapbox-gl/lib/map-events";
const Mapbox = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_MAPBOX_API,
});

export default function Map(event) {
    const [popup, showPopup] = React.useState(false);
    const [popupContent, updateContent] = React.useState(false);

    useEffect(() => {
      const getData = async () => {
      }
      getData();
    },[popup]);

    if(event.props) {
        return (

            <Mapbox
              style="mapbox://styles/mapbox/navigation-preview-day-v4"
              containerStyle={{
                height: "100vh",
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
                <img src={marker1}/>
                
              </Marker>
            </Mapbox>
          );
    } else {

      const layoutLayer = { 'icon-image': 'eventMarker' };
      const image = new Image();
      image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(marker);
      const images = ['eventMarker', image];
      
        return (
          <div>

            <Mapbox
              style="mapbox://styles/mapbox/navigation-preview-day-v4"
              containerStyle={{
                height: "50vh",
                width: "100vw"
              }}
              zoom={[13]}
              center={[25.083669662475586, 60.24193572998047]}>
              >

              <Layer type="symbol" layout={layoutLayer} images={images}>

              {!events.events ? event.events.map((item) => (
                <Feature id="markerIcon"
                key={item.id}
                coordinates={[item.location.lon, item.location.lat]}
                onClick={(() => {
                  updateContent(item)
                })}              
                />                
              )) : 
              <Feature/>
              }
              </Layer>
              
            </Mapbox>
          <div className="d-flex flex-row justify-content-around">
            
              <h2>{popupContent ? popupContent.name.fi : ""}</h2>
          </div>
          </div>
          );
    }
 
}
