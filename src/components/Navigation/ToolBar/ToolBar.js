import React from 'react';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from "./ToolBar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems"

const toolbar = (props) => (
  <header className={classes.ToolBar}>
    <DrawerToggle clicked={props.open}/>
    <Logo class={classes.Logo}/>
    <nav className={classes.DesktopOnly}>
        <NavigationItems/>
    </nav>
  </header>
);

export default toolbar;