import React from 'react';
import './BackDrop.css'

const backDrop = props => {
    if(props.drawerToggleClickHandler){
        return (<nav className="backdrop" onClick={props.drawerToggleClickHandler} />);
    } else if (props.popupClickHandler) {
        return (<nav className="backdrop" onClick={() => {            
            props.popPopUp();
            props.popupClickHandler();
        }} />);
    } else {
        return (<nav className="backdrop" onClick={() => {            
            props.organizationHandler();
        }} />);

    }
}
export default backDrop;
