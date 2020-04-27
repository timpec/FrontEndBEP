import React, { useEffect } from "react";
import Mapbox from '../../components/Map/map.gl'
import {getEvents, getFriendsEvents, getYourEvents} from '../../services/graphqlService';

export default function Map() {
    const [events, updateEvents] = React.useState([]);
    const [active, updateActive] = React.useState(1);

    useEffect(() => {
        const getData = async () => {
            let data = await getEvents();
            updateEvents(data);
        }
        getData();
      },[]);

      const pressedButton = async (id) => {
        updateActive(id);
        let data
        switch(id){
            case 1:
                data = await getEvents();
                updateEvents(data);
                break;
            case 2:
                //Get this id from localStorage
                data = await getFriendsEvents("5ea5859e28b80937a44c760f");
                console.log(data.friends)
                break;
            case 3:
                data = await getYourEvents("5ea5859e28b80937a44c760f");
                break;
            default:
                data = await getEvents();
                break;                
        }
      }

    return (
        <div>
          <div className="d-flex flex-row justify-content-around">
              {active === 1 ?               
              <button type="button" disabled class="btn btn-secondary">Normal</button>:
              <button type="button" onClick={(() => {pressedButton(1)})} class="btn btn-primary">Normal</button>
            }
             {active === 2 ?               
              <button type="button" disabled class="btn btn-secondary">Friends</button>:
              <button type="button" onClick={(() => {pressedButton(2)})} class="btn btn-primary">Friends</button>
            }
             {active === 3 ?               
              <button type="button" disabled class="btn btn-secondary">Closest</button>:
              <button type="button" onClick={(() => {pressedButton(3)})} class="btn btn-primary">Closest</button>
            }
          </div>
            <Mapbox events={events}/>
            </div> 
    )
}