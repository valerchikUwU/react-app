import React from "react";
import classes from "./Header.module.css";
import exit from "./Exit.svg";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postHeader } from "../../BLL/Header";
import useNetwork from "../Custom/useNetwork"; // Импорт хука
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";

export default function Header() {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const exitFunc = () => {
    dispatch(postHeader({ accountId: accountId }));
  };
  const isOnline = useNetwork();
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
      </IconButton>{" "}
      {isOnline ? (
        ""
      ) : (
        <SignalWifiOffIcon
          style={{
            color: "red",
            float: "right",
            marginTop: "7px",
            marginRight: "7px",
          }}
        ></SignalWifiOffIcon>
      )}
    </div>
  );
}
