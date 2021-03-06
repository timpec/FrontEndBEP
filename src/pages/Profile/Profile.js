// Profile page for user data and modifications
import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import Card from 'react-bootstrap/Card';
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
import {getUser, removeFriend, modifyUser, addIntrests, removeIntrests, removeUser} from '../../services/userGqlService';

export default function Profile (props) {
    const [user, updateUser] = React.useState([]);
    const [address, updateAddress] = React.useState([]);
    const [intrests, updateIntrest] = React.useState([]);
    const [friends, updateFriends] = React.useState([])
  
  const [emailField, setEmailField] = React.useState("");
  const [addressField, setAddressField] = React.useState("");
  const [passwordField, setPasswordField] = React.useState("");

  const [intrestAdd, setIntrestAdd] = React.useState("");
  const [intrestRemove, setIntrestRemove] = React.useState("");

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


  //Get id from localstorage and delete user
  const deleteFriend = async (friends) => {
    const id = localStorage.getItem('userid');
    let data = await removeFriend(id, friends)
    updateFriends(data.friends)
  }

  //Get id from localstorage and modify user
  const editUser= async () => {
    const id = localStorage.getItem('userid');
    const data = await modifyUser(id, emailField, addressField, passwordField);
  }

  //Get id from localstorage and add to intrests array
  const addUserIntrest = async () => {
    const id = localStorage.getItem('userid');
    const data = await addIntrests(id, intrestAdd);
    updateIntrest(data.intrests)
  }

  //Get id from localstorage and remove from intrests array
  const removeUserIntrest = async () => {
    const id = localStorage.getItem('userid');
    if (intrestRemove !== "") {
      const data = await removeIntrests(id, intrestRemove);
      updateIntrest(data.intrests)
    }
  }

  //Get id from localstorage and delete user and logout
  const deleteAccount = async () => {
    const id = localStorage.getItem('userid');
    const data = await removeUser(id);
    logout()
  }

  //Empty localstorage and redirect to login page
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
                <h2 className="font-weight-bold">{user.username}</h2>
              </Card.Body>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem key="email" ><h5 className="font-weight-bold">{user.email}</h5></ListGroupItem>
                  <ListGroupItem key="address"><h5 className="font-weight-bold">{address.street_address}, {address.locality}</h5></ListGroupItem>
                </ListGroup>
              </Card.Body >
              <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">{I18n.t("profile.modify_col")}</Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body id="prof_col"> 
                      <Form>
                        <Form.Label className="font-weight-bold">{I18n.t("profile.modify_title")}</Form.Label>
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
                        <Button variant="primary" type="submit" onClick={() => editUser()}>{I18n.t("profile.modify_btn")}</Button>
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
              </Accordion>
            </Card>
          </div>
          <div className="card_container">
            <Card>
              <Card.Body>
                <h3 className="font-weight-bold">{I18n.t("profile.intrests_title")}</h3>
              </Card.Body>
              <Card.Body>
                <div>
                {intrests.map(item => (
                  <h4 className="font-weight-bold" key={item} className="intrest_badge"><Badge pill variant="secondary">{item}</Badge></h4>
                ))}
                </div>
              </Card.Body>
              <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">{I18n.t("profile.add_delete")}</Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                <Card.Body id="intrest_add_col"> 
                  <Form>
                    <div className="intrestfield_container">
                      <div className="intrestField">
                      <Form.Group as={Row} controlId="intrestAdd">
                        <Col sm="10">
                          <Form.Control type="text" placeholder="Esim. music" onChange={e => setIntrestAdd(e.target.value)} />
                        </Col>
                      </Form.Group>
                      </div>
                        <div className="iBtn">
                    <Button variant="primary" type="button" onClick={() => addUserIntrest()}>{I18n.t("profile.add")}</Button>
                    </div>
                    </div>
                  </Form>
                  <Form>
                    <div className="intrestfield_container">
                      <div className="intrestField">
                      <Form.Group as={Row} controlId="intrestRemove">
                        <Col sm="10">
                          <Form.Control as="select" onChange={e => setIntrestRemove(e.target.value)}>
                          <option value="" selected disabled hidden>{I18n.t("profile.chooseHere")}</option>
                            {intrests.map(item => (
                              <option key={item}>{item}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      </div>
                      <div className="iBtn">
                    <Button variant="primary" type="button" onClick={() => removeUserIntrest()}>{I18n.t("profile.delete")}</Button>
                    </div>
                    </div>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
              </Accordion>
            </Card>
          </div>
          <div className="card_container">
            <Card>
              <Card.Body>
                <h3 className="font-weight-bold">{I18n.t("profile.friends_title")}</h3>
              </Card.Body>
              <Accordion>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">{I18n.t("profile.friends_btn")}</Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body id="friend_col">
              <div>
                  {friends.map(item => (
                    <Card key={item.username} className="friend_card">
                      <Card.Body>
                      <Card.Title className="card_text"><h4 className="font-weight-bold">{item.username}</h4></Card.Title>
                      <Card.Subtitle className="card_text"><h5 className="font-weight-bold">{item.email}</h5></Card.Subtitle>
                      <Card.Subtitle className="card_text"><h5 className="font-weight-bold">{I18n.t("profile.from")} {item.address.locality}</h5></Card.Subtitle>
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
            <Card.Body>
            <Card.Title><h4 className="font-weight-bold">{I18n.t("profile.deleteUser_title")}</h4></Card.Title>
            </Card.Body>
            <Accordion>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">{I18n.t("profile.deleteConfirm")}</Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
            <Card.Body className="deleteaccount_body">
          <div className="deleteaccount_Container">
                <button
                type="button"
                className="deleteaccount_btn"
                onClick={() => deleteAccount()}>
            {I18n.t("profile.deleteaccountButton")}
          </button>
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