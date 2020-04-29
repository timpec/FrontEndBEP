import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import Card, { CardTitle, CardBody } from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Profile.css";
import {getUser} from '../../services/graphqlService';

export default function Profile (props) {
    const [user, updateUser] = React.useState([]);
    const [address, updateAddress] = React.useState([]);
    const [intrests, updateIntrest] = React.useState([]);
    const [friends, updateFriends] = React.useState([])
    const [open, setOpen] = React.useState(false);
    
    const [redirectLogin, changeRedirectLogin] = React.useState(false);
  
  useEffect(() => {
    const getData = async () => { 
    const id = localStorage.getItem('userid')
      let data = await getUser(id);
      updateUser(data);
      updateAddress(data.address);
      updateIntrest(data.intrests);
      updateFriends(data.friends);
    }
    getData();
  },[user, address, intrests, friends]);

    const placeholder = async () => {
        localStorage.clear()
        changeRedirectLogin(true);
    }
    if (redirectLogin) {
      return <Redirect push to="/login" />;
    }

    return (
        <div className="profile_container">
          <div className="card_container">
            <Card>
              <Card.Body>
                  <h3>{user.username}</h3>
              </Card.Body>
              <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{user.email}</ListGroupItem>
                <ListGroupItem>{address.street_address}, {address.locality}</ListGroupItem>
              </ListGroup>
              </Card.Body >
            </Card>
          </div>
          <div className="card_container">
            <Card>
              <Card.Body>
                <h3>{I18n.t("profile.intrests_title")}</h3>
              </Card.Body>
              <Card.Body>
              <div>
                  {intrests.map(item => (
                    <h4 className="intrest_badge"><Badge pill variant="secondary">{item}</Badge></h4>
                  ))}
                  </div>
              </Card.Body>
            </Card>
          </div>
          <div className="card_container">
            <Card>
              <Card.Body>
                <h3>{I18n.t("profile.friends_title")}</h3>
              </Card.Body>
              <Button
                className="frienBtn"
                onClick={() => setOpen(!open)}
                aria-controls="friend_col"
                aria-expanded={open}>{I18n.t("profile.friends_button")}</Button>
              <Collapse in={open}>
                <Card.Body id="friend_col">
              <div>
                  {friends.map(item => (
                    <Card className="friend_card">
                      <Card.Body>
                      <Card.Title>{item.username}</Card.Title>
                      <Card.Subtitle>{item.email}</Card.Subtitle>
                      </Card.Body>
                      <Card.Body>
                      <div>
                  {item.intrests.map(i => (
                    <Badge pill variant="secondary">{i}</Badge>
                  ))}
                  </div>
                      </Card.Body>
                    </Card>
                  ))}
                  </div>
              </Card.Body>
              </Collapse>
            </Card>
          </div>
          <div className="card_container">
          <Card>
            <Card.Body className="logout_body">
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
        </div>

    )
}