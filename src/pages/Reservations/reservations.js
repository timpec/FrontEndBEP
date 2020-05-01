import React, { useEffect } from "react";
import { getYourEvents } from "../../services/graphqlService";
import moment from "moment"

export default function Profile() {
  const [reservations, updateReservations] = React.useState([]);
  const [joku, updateJoku] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      //get id from localStorage
      const userToken = localStorage.getItem('userid');
      let data = await getYourEvents(userToken);
      console.log(data.reservations)
      updateReservations(data.reservations);
    };
    getData();
  }, [joku]);

  return (
    <div>
      <h1>Reservations</h1>
      <ul className="list-group">

      {reservations.map((reservation) => (
        <div key={reservation.id} className="card list-group-item">
          <div className="card-header">{reservation.name.fi}</div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
             {reservation.description.intro}
            </p>
            <a href={"DetailPage/"+reservation.id} className="btn btn-outline-secondary">
              Visit site
            </a>
          </div>
          <div className="card-footer text-muted">
        </div>
        </div>
      ))}
      </ul>
    </div>
  );
}
