import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import Card, { CardTitle, CardBody } from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Profile.css";
import {getUser, removeFriend, modifyUser} from '../../services/graphqlService';

export default function Profile (props) {
    const [user, updateUser] = React.useState([]);
    const [address, updateAddress] = React.useState([]);
    const [intrests, updateIntrest] = React.useState([]);
    const [friends, updateFriends] = React.useState([])
    const [open, setOpen] = React.useState(false);

  
  const [emailField, setEmailField] = React.useState("");
  const [addressField, setAddressField] = React.useState("");
  const [passwordField, setPasswordField] = React.useState("");
    
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


  const deleteFriend = async (friends) => {
    const id = localStorage.getItem('userid');
    let data = await removeFriend(id, friends)
    console.log(data)
  }

  const placeholder= async (friends) => {
    const id = localStorage.getItem('userid');
    const data = await modifyUser(id, emailField, addressField, passwordField);
    console.log(data)
  }

    const logout = async () => {
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
                <ListGroupItem key="email">{user.email}</ListGroupItem>
                <ListGroupItem key="address">{address.street_address}, {address.locality}</ListGroupItem>
              </ListGroup>
              </Card.Body >
              <Accordion>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">{I18n.t("profile.modify_col")}</Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body id="prof_col"> 
                  <Form>
                    <Form.Label>{I18n.t("profile.modify_title")}</Form.Label>
                  <Form.Group as={Row} controlId="formEmail">
                      <Col sm="10">
                        <Form.Control type="email" placeholder={I18n.t("profile.modify_email")} onChange={email => setEmailField(email.target.value)} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formAddress">
                      <Col sm="10">
                        <Form.Control type="text" placeholder={I18n.t("profile.modify_address")} onChange={address => setAddressField(address.target.value)} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPassword">
                      <Col sm="10">
                        <Form.Control type="password" placeholder={I18n.t("profile.modify_password")} onChange={password => setPasswordField(password.target.value)} />
                      </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => placeholder()}>{I18n.t("profile.modify_btn")}</Button>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
              </Accordion>
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
                    <h4 key={item} className="intrest_badge"><Badge pill variant="secondary">{item}</Badge></h4>
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
              <Accordion>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">{I18n.t("profile.friends_btn")}</Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body id="friend_col">
              <div>
                  {friends.map(item => (
                    <Card key={item.username} className="friend_card">
                      <Card.Body>
                      <Card.Title><h4>{item.username}</h4></Card.Title>
                      <Card.Subtitle><h5>{item.address.locality}</h5></Card.Subtitle>
                      <Card.Subtitle><h5>{item.email}</h5></Card.Subtitle>
                      </Card.Body>
                      <Card.Body>
                      <div>
                  {item.intrests.map(i => (
                    <Badge key={item.username} pill variant="secondary">{i}</Badge>
                  ))}
                  </div>
                      </Card.Body>
                      <div className="deletefriend_btnContainer">
                        <button
                        type="button"
                        className="deletefriend_btn"
                        onClick={() => deleteFriend(item.id)}>
                        {I18n.t("profile.deletefriend_btn")}
                        </button>
                      </div>
                    </Card>
                  ))}
                  </div>
              </Card.Body>
              </Accordion.Collapse>
              </Accordion>
            </Card>
          </div>
          <div className="card_container">
          <Card>
            <Card.Body className="logout_body">
          <div className="logout_btnContainer">
                <button
                type="button"
                className="logout_btn"
                onClick={() => logout()}>
            {I18n.t("profile.logoutButton")}
          </button>
        </div>
        </Card.Body>
        </Card>
        </div>
        </div>

    )
}