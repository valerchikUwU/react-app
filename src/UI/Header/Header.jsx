import React from "react";
import classes from "./Header.module.css";
import exit from "./Exit.svg";
import IconButton from "@mui/material/IconButton";

export default function Header() {
  return (
    <div className={classes.header}>
      <IconButton sx={{
      float: 'right',
      marginTop: "7px",
      marginRight: "7px",
    }}>
        <img src={exit} alt="выход" />
      </IconButton>
    </div>
  );
}
