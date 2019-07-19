import React from "react";
import classes from "./Button.css"

const btn = props => (
  <button
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    disabled={props.disabled}
    >
    {props.children}
  </button>
);

export default btn;
