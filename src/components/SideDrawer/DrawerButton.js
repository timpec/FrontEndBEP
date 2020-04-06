import React from 'react';
import './DrawerButton.css'

const drawerButton = props => (
    <button className={"toggleButton " + (props.showX ? "x" : "") + " " +(props.show ? "": "y")} onClick={props.click}>
        <div className={"menuLine bar1"} />
        <div className="menuLine bar2"/>
        <div className="menuLine bar3"/>
    </button>
);

export default drawerButton;