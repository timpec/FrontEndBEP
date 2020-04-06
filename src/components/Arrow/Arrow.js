import React from 'react';
import './Arrow.css'

const arrow = props => (
    <button className={"arrowButton " + (props.anim ? "Xanim": "")}>
        <div className="arrowLine arr1"/>
        <div className="arrowLine arr2"/>

    </button>
);

export default arrow;