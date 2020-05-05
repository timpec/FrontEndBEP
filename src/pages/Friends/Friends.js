// Friends page for looking for new friends
import React, {useEffect} from "react";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Friends.css";
import {searchUsers, addFriend} from '../../services/userGqlService';


export default function Friends() {

    const [users, updateList] = React.useState([]);
    const [searchField, setSearchField] = React.useState("");
  
  useEffect(() => {
    const getData = async () => {
      let data = await searchUsers(searchField);
      updateList(data);
    }
    getData();
  },[users]);


  // Updates the list when search has input
    const updateSearch = async (searchField) => {
        setSearchField(searchField.target.value);
        let data = await searchUsers(searchField)
        updateList(data);
    }

  // Adds a new friend to users friends list
    const addNewFriend = async (friends) => {
        await addFriend(friends);
        let list = await searchUsers(searchField)
        updateList(list)
      }


    return (
        <div className="friendsPage">
            <div className="friendsPageTitle">
                <h2 className="font-weight-bold">{I18n.t("friends.lookForFriends")}</h2>
            </div>
            <div className="md-form mt-0 d-flex flex-row">
                <input className="form-control" onChange={updateSearch} type="text" id="Input" placeholder="Search" aria-label="Search" name="searchField"/>
            </div>
            <div className="friend_card_cont">
            {users.map(item => (
                <div key={item.email} className="friend_card">
                <Card>
                    <Card.Body>
                      <Card.Title className="card_text"><h3 className="font-weight-bold">{item.username}</h3></Card.Title>
                      <Card.Subtitle className="card_text"><h5 className="font-weight-bold">{item.email}</h5></Card.Subtitle>
                      <Card.Subtitle className="card_text"><h5 className="font-weight-bold">{I18n.t("friends.from")} {item.address.locality}</h5></Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                    {item.intrests.map(i => (
                        <Badge key={i} pill variant="secondary">{i}</Badge>
                    ))}
                    </Card.Body>
                    <div className="deletefriend_btnContainer">
                        <form>
                        <button
                        type="submit"
                        className="deletefriend_btn"
                        onClick={() => addNewFriend(item.id)}>
                        {I18n.t("friends.addFriend")}
                        </button>
                        </form>
                    </div>
                </Card>
                </div>
            ))}
            </div>
        </div>
    )
}