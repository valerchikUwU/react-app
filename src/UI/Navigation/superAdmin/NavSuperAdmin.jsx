import classes from "./NavSuperAdmin.module.css";
import React from "react";
import Logo from "../logo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

export default function Nav() {
  const location = useLocation();
  const orders = useSelector((state) => state.adminOrder.orders.length);

  return (
    <div className={classes.nav}>
      <img src={Logo} alt="Logo" className={classes.logo} />

      <div className={classes.list}>
        
      <NavLink to="deposits">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/deposits")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Депозиты
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft:'70px'}}
            >
              <path
                d="M5 6H23V18H5V6ZM14 9C14.7956 9 15.5587 9.31607 16.1213 9.87868C16.6839 10.4413 17 11.2044 17 12C17 12.7956 16.6839 13.5587 16.1213 14.1213C15.5587 14.6839 14.7956 15 14 15C13.2044 15 12.4413 14.6839 11.8787 14.1213C11.3161 13.5587 11 12.7956 11 12C11 11.2044 11.3161 10.4413 11.8787 9.87868C12.4413 9.31607 13.2044 9 14 9ZM9 8C9 8.53043 8.78929 9.03914 8.41421 9.41421C8.03914 9.78929 7.53043 10 7 10V14C7.53043 14 8.03914 14.2107 8.41421 14.5858C8.78929 14.9609 9 15.4696 9 16H19C19 15.4696 19.2107 14.9609 19.5858 14.5858C19.9609 14.2107 20.4696 14 21 14V10C20.4696 10 19.9609 9.78929 19.5858 9.41421C19.2107 9.03914 19 8.53043 19 8H9ZM1 10H3V20H19V22H1V10Z"
                fill="white"
                fill-opacity="0.5"
                className={
                  location.pathname.includes("/deposits")
                    ? classes.activeLinkIcon
                    : ""
                }
              />
            </svg>
          </div>
        </NavLink>

        <div className={classes.itemCart}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.4 18.2C8.8 18.7 9 19.3 9 20C9 21.7 7.7 23 6 23C4.3 23 3 21.7 3 20C3 18.3 4.3 17 6 17C6.4 17 6.8 17.1 7.2 17.3L8.6 15.5C7.7 14.5 7.3 13.1 7.5 11.8L5.5 11.1C5 11.9 4.1 12.5 3 12.5C1.3 12.5 0 11.2 0 9.5C0 7.8 1.3 6.5 3 6.5C4.7 6.5 6 7.8 6 9.5V9.7L8 10.4C8.6 9.2 9.8 8.3 11.2 8.1V5.9C10 5.6 9 4.4 9 3C9 1.3 10.3 0 12 0C13.7 0 15 1.3 15 3C15 4.4 14 5.6 12.8 5.9V8.1C14.2 8.3 15.4 9.2 16 10.4L18 9.7V9.5C18 7.8 19.3 6.5 21 6.5C22.7 6.5 24 7.8 24 9.5C24 11.2 22.7 12.5 21 12.5C19.9 12.5 19 11.9 18.5 11.1L16.5 11.8C16.7 13.1 16.3 14.5 15.4 15.5L16.8 17.3C17.2 17.1 17.6 17 18 17C19.7 17 21 18.3 21 20C21 21.7 19.7 23 18 23C16.3 23 15 21.7 15 20C15 19.3 15.2 18.7 15.6 18.2L14.2 16.4C12.8 17.2 11.2 17.2 9.8 16.4L8.4 18.2Z"
              fill="white"
            />
          </svg>

          <span
            className={classes.activeLinkText}
            style={{ marginLeft: "15px" }}
          >
            Аналитика
          </span>
        </div>

        <NavLink to="comission">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/comission")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Комиссионные
            </span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "20px" }}
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM8.83 7.05C9.81 7.05 10.6 7.84 10.6 8.83C10.6 9.81 9.81 10.6 8.83 10.6C7.84 10.6 7.05 9.81 7.05 8.83C7.05 7.84 7.84 7.05 8.83 7.05ZM15.22 17C14.24 17 13.45 16.2 13.45 15.22C13.45 14.24 14.24 13.45 15.22 13.45C16.2 13.45 17 14.24 17 15.22C17 16.2 16.2 17 15.22 17ZM8.5 17.03L7 15.53L15.53 7L17.03 8.5L8.5 17.03Z"
                fill="white"
                fill-opacity="0.5"
                className={
                  location.pathname.includes("/comission")
                    ? classes.activeLinkIcon
                    : ""
                }
              />
            </svg>
          </div>
        </NavLink>

        <NavLink to="statistics">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/statistics")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Статистика
            </span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "52px" }}
            >
              <path
                d="M16 11.78L20.24 4.45L21.97 5.45L16.74 14.5L10.23 10.75L5.46 19H22V21H2V3H4V17.54L9.5 8L16 11.78Z"
                fill="white"
                fill-opacity="0.5"
                className={
                  location.pathname.includes("/statistics")
                    ? classes.activeLinkIcon
                    : ""
                }
              />
            </svg>
          </div>
        </NavLink>

        <NavLink to="review">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/review")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Отчеты
            </span>

            <svg
              width="28"
              height="30"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "85px" }}
            >
              <g filter="url(#filter0_d_1521_1739)">
                <path
                  d="M16 6H24V22H16V6ZM4 4H24V2H4V4ZM4 8H14V6H4V8ZM11 22H14V10H11V22ZM4 22H9V10H4V22Z"
                  fill="white"
                  fill-opacity="0.5"
                  className={
                    location.pathname.includes("/review")
                      ? classes.activeLinkIcon
                      : ""
                  }
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1521_1739"
                  x="-2"
                  y="0"
                  width="32"
                  height="32"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1521_1739"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1521_1739"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </NavLink>

        <NavLink to="reciever">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/reciever")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Получатель
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "48px" }}
            >
              <path
                d="M5 6H23V18H5V6ZM14 9C14.7956 9 15.5587 9.31607 16.1213 9.87868C16.6839 10.4413 17 11.2044 17 12C17 12.7956 16.6839 13.5587 16.1213 14.1213C15.5587 14.6839 14.7956 15 14 15C13.2044 15 12.4413 14.6839 11.8787 14.1213C11.3161 13.5587 11 12.7956 11 12C11 11.2044 11.3161 10.4413 11.8787 9.87868C12.4413 9.31607 13.2044 9 14 9ZM9 8C9 8.53043 8.78929 9.03914 8.41421 9.41421C8.03914 9.78929 7.53043 10 7 10V14C7.53043 14 8.03914 14.2107 8.41421 14.5858C8.78929 14.9609 9 15.4696 9 16H19C19 15.4696 19.2107 14.9609 19.5858 14.5858C19.9609 14.2107 20.4696 14 21 14V10C20.4696 10 19.9609 9.78929 19.5858 9.41421C19.2107 9.03914 19 8.53043 19 8H9ZM1 10H3V20H19V22H1V10Z"
                fill="white"
                fill-opacity="0.5"
                className={
                  location.pathname.includes("/reciever")
                    ? classes.activeLinkIcon
                    : ""
                }
              />
            </svg>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
