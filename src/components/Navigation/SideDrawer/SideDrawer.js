import React from "react";
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => {

  let attachedClasses = [classes.Close, classes.SideDrawer];

  if (props.show) {
    attachedClasses = [classes.Open, classes.SideDrawer];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo class={classes.Logo}/>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;