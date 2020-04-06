import React from 'react';
import './Toolbar.css';
import DrawerButton from '../SideDrawer/DrawerButton';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbarNavigation">
        <div className="toolbarLogo"></div>
        <div className="toolbarLogo center"></div>
        <div className="toolbarLogo"></div>
        <div className="toolbarLogo"></div>
        <div className="toolbarLogo"></div>
        <div>
            <DrawerButton showX={props.showX} show={props.show} click={props.drawClickHandler}/>
        </div>
        <div className="toolbarNavItems">
        </div>
        </nav>
    </header>
);
export default toolbar;