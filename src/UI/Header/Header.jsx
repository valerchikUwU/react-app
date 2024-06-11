import React from "react";
import classes from "./Header.module.css";
import exit from "./Exit.svg";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postHeader } from "../../BLL/Header";

export default function Header() {
  const dispatch = useDispatch();
  const { accountId } = useParams();
const exitFunc = () => {
  dispatch(postHeader({accountId: accountId}));
}
  return (
    <div className={classes.header}>
      <IconButton
        sx={{
          float: "right",
          marginTop: "7px",
          marginRight: "7px",
        }}
        onClick={exitFunc}
      >
        <img src={exit} alt="выход" />
      </IconButton>
    </div>
  );
}
