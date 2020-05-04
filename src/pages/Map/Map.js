import React, { useEffect } from "react";
import Mapbox from '../../components/Map/map.gl'
import { getDataPackage } from '../../services/graphqlService';

export default function Map() {
    const [dataPackage, updateDataPackage] = React.useState([]);

    useEffect(() => {
        const getData = async () => {
          const userToken = localStorage.getItem('userid');
          let data = await getDataPackage(userToken);
          console.log(data);
          updateDataPackage(data);
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
          </div>*/
            <Mapbox props={dataPackage} />}
            </div> 
    )
}