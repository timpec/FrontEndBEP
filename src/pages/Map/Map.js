import React, { useEffect } from "react";
import Mapbox from '../../components/Map/map.gl'
import {getEvents} from '../../services/graphqlService';

export default function Map() {
    const [events, updateEvents] = React.useState([]);


    useEffect(() => {
        const getData = async () => { 
            let data = await getEvents();
            updateEvents(data);
        }
        getData();
      });


    return (
        <div>
            <Mapbox events={events}/>
        </div>
    )
}