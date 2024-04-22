import React from "react";
import Logo from "./logo.svg";
import classes from './NavMain.module.css'

export default function NavMain() {
  return (
    <div className={classes.nav}>
      <img src={Logo} alt="Logo" className={classes.logo} />
    </div>
  );
}
