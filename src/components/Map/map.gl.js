import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./map.gl.css";

let map;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
export default function Map(props) {
  const mapboxElRef = useRef(null); // DOM
  
  //TODO: ALL EVENTS AND SHIIIT
  useEffect(() => {
    console.log(props)

    if (props.props && props.props.YourEvents && props.props.events.length && props.props.friendsEvents) {

      let events;
      let friendsEvents;
      let YourEvents;
      
      map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/navigation-preview-day-v4",
        //OTA LOCALSTORAGESTA SINULLE
        center: [25.012341,60.782132], // initial geo location
        zoom: 12, // initial zoom
        });

        map.once("load", () => {
          events = props.props.events.map((event, index) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [event.location.lon, event.location.lat],
            },
            properties: {
              id: index, // unique identifier in this case the index
              name: event.name.fi,
              eventId: event.id
            },
          }));
          
          YourEvents = props.props.YourEvents.reservations.map((reservation, index) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [reservation.location.lon, reservation.location.lat],
            },
            properties: {
              id: index, // unique identifier in this case the index
              name: reservation.name.fi,
              eventId: reservation.id
            },
          }));
          
          friendsEvents = props.props.friendsEvents.friends.map((friend, index) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              //coordinates: [reservation.location.lon, reservation.location.lat],
            },
            properties: {
              id: index, // unique identifier in this case the index
              //name: reservation.name.fi,
            },
          }))
          map.addSource("events", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: events,
            },
          });

          map.addSource("yourEvents", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: YourEvents,
            },
          });

          map.addLayer({
            id: "eventsId",
            source: "events", // this should be the id of the source
            type: "circle",
            // paint properties
            paint: {
              "circle-opacity": 0.75,
              "circle-stroke-width": 1,
              "circle-radius": 15,
              "circle-color": "#FFEB3B",
            },
          });

        map.addLayer({
          id: "yourEventsId",
          source: "yourEvents", // this should be the id of the source
          type: "circle",
          // paint properties
          paint: {
            "circle-opacity": 0.75,
            "circle-stroke-width": 1,
            "circle-radius": 15,
            "circle-color": "#0f0",
          },
        });

        map.on("click", "yourEventsId", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
  
          map.getCanvas().style.cursor = "pointer";
  
          const { name, eventId } = e.features[0].properties;
  
          const HTML = `<p><b>${name}</b></p>
          <p><a href="/DetailPage/${eventId}">More details</a></p>`;
          new mapboxgl.Popup().setLngLat(coordinates).setHTML(HTML).addTo(map);
        });
       
        
        map.on("click", "eventsId", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
  
          map.getCanvas().style.cursor = "pointer";
  
          const { name, eventId } = e.features[0].properties;
  
          const HTML = `<p><b>${name}</b></p>
          <p><a href="/DetailPage/${eventId}">More details</a></p>`;
          new mapboxgl.Popup().setLngLat(coordinates).setHTML(HTML).addTo(map);
        });
      });
      
    } else if(props.event) {
      let data;
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/navigation-preview-day-v4",
        //OTA LOCALSTORAGESTA SINULLE
        center: [props.event[0].location.lon, props.event[0].location.lat], // initial geo location
        zoom: 12, // initial zoom
      });
      map.once("load", function () {
        data = props.event.map((event, index) => ({
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
            "circle-radius": 10,
            "circle-color": "#FFEB3B",
          },
        });
      });
      map.on("click", "circles", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();

        map.getCanvas().style.cursor = "pointer";

        const { name } = e.features[0].properties;

        const HTML = `<p><b>${name}</b></p>`;
        new mapboxgl.Popup().setLngLat(coordinates).setHTML(HTML).addTo(map);
      });
      map.addControl(new mapboxgl.NavigationControl());
    }

    const getData = async () => {};
    getData();
  });

  const pressedButton = (id) => {
    let property;

    switch(id){
      case 1:
        property = map.getLayoutProperty("eventsId", 'visibility');
        if(property === "none") {
          map.setLayoutProperty("eventsId", 'visibility', 'visible');
        } else {
          map.setLayoutProperty("eventsId", 'visibility', 'none');
        }
        break;
      case 2:
        property = map.getLayoutProperty("yourEventsId", 'visibility');
        if(property === "none") {
          map.setLayoutProperty("yourEventsId", 'visibility', 'visible');
        } else {
          map.setLayoutProperty("yourEventsId", 'visibility', 'none');
        }
        break;

      default:
        break;
    }

  }

  return (
    <div className="mapContainer p-3">
      {props.props && props.props.YourEvents && props.props.events.length && props.props.friendsEvents ? 
      (
        <div className="d-flex flex-row justify-content-around p-3">
      <button type="button" onClick={(() => {pressedButton(1)})} className="btn btn-primary">Events</button>
      <button type="button" onClick={(() => {pressedButton(2)})} className="btn btn-primary">Your Events</button>
      <button type="button" onClick={(() => {pressedButton(3)})} className="btn btn-primary">friends Events</button>
      </div>
      )
      : <div></div>}
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
