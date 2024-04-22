import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./New.module.css";
import NavLinkWithHover from './NavLinkWithHover.jsx'

export default function New(props) {
  const location = useLocation();

  return (
    <>
      <nav className={classes.nav}>
      <NavLinkWithHover to="start"   style={{ color: location.pathname.includes("/start") ? '#555555' : '',  }}>
        Начальные
      </NavLinkWithHover>
      <NavLinkWithHover to="basic"  style={{ color: location.pathname.includes("/basic") ? '#555555' : '',  }}>
        Основные
      </NavLinkWithHover>
      <NavLinkWithHover to="personal" style={{ color: location.pathname.includes("/personal") ? '#555555' : '' }}>
        Для персонала
      </NavLinkWithHover>
      <NavLinkWithHover to="deposit" style={{ color: location.pathname.includes("/deposit") ? '#555555' : '' }}>
        Пополнение депозита
      </NavLinkWithHover>
      </nav>

      {props.children}

    </>
  );
}
