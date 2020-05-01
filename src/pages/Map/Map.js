import React, { useEffect } from "react";
import Mapbox from '../../components/Map/map.gl'
import {getEvents, getFriendsEvents, getYourEvents} from '../../services/graphqlService';

export default function Map() {
    const [events, updateEvents] = React.useState([]);
    const [friendsEvents, updateFriendsEvents] = React.useState([]);
    const [yourEvents, updateYourEvents] = React.useState([]);
    const [active, updateActive] = React.useState(1);

    useEffect(() => {
        const getData = async () => {
          const userToken = localStorage.getItem('userid');
          let data = await getEvents();
          updateEvents(data);

          let friends = await getFriendsEvents(userToken);
          updateFriendsEvents(friends);

          let yourEvents = await getYourEvents(userToken);
          updateYourEvents(yourEvents);
        }

        getData();
      },[]);

    return (
        <div>
         {/**  <div className="d-flex flex-row justify-content-around">
              {active === 1 ?               
              <button type="button" disabled className="btn btn-secondary">Normal</button>:
              <button type="button" onClick={(() => {pressedButton(1)})} className="btn btn-primary">Normal</button>
            }
             {active === 2 ?               
              <button type="button" disabled className="btn btn-secondary">Friends</button>:
              <button type="button" onClick={(() => {pressedButton(2)})} className="btn btn-primary">Friends</button>
            }
             {active === 3 ?               
              <button type="button" disabled className="btn btn-secondary">Closest</button>:
              <button type="button" onClick={(() => {pressedButton(3)})} className="btn btn-primary">Closest</button>
            }
          </div>*/}
            <Mapbox props={events} yourEvents={yourEvents} friendsEvents={friendsEvents}/>
            </div> 
    )
}