import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Profile.css";
import {getUser} from '../../services/graphqlService';

export default function Profile (props) {
    const [user, updateUser] = React.useState([]);
    const [address, updateAddress] = React.useState([]);
    const [intrest, updateIntrest] = React.useState([]);
  
  useEffect(() => {
    const getData = async () => { 
    const id = localStorage.getItem('userid')
      let data = await getUser(id);
      updateUser(data);
      updateAddress(data.address);
      updateIntrest(data.intrest);
    }
    getData();
  },[user, address]);

    const placeholder = async () => {
        //Logout
    }


    return (
        <div className="profile_container">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="http://placekitten.com/200/200" />
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                <ListGroupItem>{address.street_address}, {address.locality}</ListGroupItem>
                <ListGroupItem>{user.email}</ListGroupItem>
                <ListGroupItem>intrests</ListGroupItem>
                </ListGroup>
                <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
                <div className="logout_btnContainer">
                <button
                type="button"
                className="logout_btn"
                onClick={() => placeholder()}>
            {I18n.t("profile.logoutButton")}
          </button>
        </div>
                </Card.Body>
                </Card>
        </div>

    )
}