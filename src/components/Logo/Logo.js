import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

const logo = (props) => (
  <div className={props.class}>
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="logo"/>
    </div>
  </div>
  
);

export default logo;