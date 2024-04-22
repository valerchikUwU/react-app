import React from "react";
import classes from "./Content.module.css";

export default function Content(props) {
  return (
    <div className={classes.content}>
      {props.children}
      </div>
  )
 
}
