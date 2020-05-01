import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./map.gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
export default function Map(props) {
  const mapboxElRef = useRef(null); // DOM
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let data;
    let data1;
    console.log(props)
    if (props.props.length && props.friendsEvents && props.yourEvents) {

      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/navigation-preview-day-v4",
        //OTA LOCALSTORAGESTA SINULLE
        center: [24.941434860229492, 60.15963363647461], // initial geo location
        zoom: 12, // initial zoom
      });
      map.once("load", function () {


        if(props.props.friends) {
          console.log("paska")
        }
        data = props.props.map((event, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [event.location.lon, event.location.lat],
          },
          properties: {
            id: index, // unique identifier in this case the index
            name: event.name.fi,
          },
        }));

        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data,
          },
        });
        // Add our layer
        map.addLayer({
          id: "circles",
          source: "points", // this should be the id of the source
          type: "circle",
          // paint properties
          paint: {
            "circle-opacity": 0.75,
            "circle-stroke-width": 1,
            "circle-radius": 15,
            "circle-color": "#FFEB3B",
          },
        });
      });
      map.on("click", "circles", (e) => {
        const id = e.features[0].properties.id;
        const coordinates = e.features[0].geometry.coordinates.slice();

        console.log(coordinates);
        map.getCanvas().style.cursor = "pointer";

        const { name } = e.features[0].properties;

        const HTML = name;
        new mapboxgl.Popup().setLngLat(coordinates).setHTML(HTML).addTo(map);
      });
      map.addControl(new mapboxgl.NavigationControl());

    }

    const getData = async () => {};
    getData();
  });

  return (
    <div className="mapContainer p-3">
      {/* Assigned Mapbox container */}
      <div className="mapBox" ref={mapboxElRef} />
    </div>
  );
}

/*

*/

/*
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
*/
