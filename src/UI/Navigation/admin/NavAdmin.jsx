import classes from "./NavAdmin.module.css";
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
        <div className={classes.itemCart}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 13.5C9.07158 13.5 8.18134 13.1313 7.52497 12.4749C6.86859 11.8185 6.49984 10.9283 6.49984 10C6.49984 9.07174 6.86859 8.1815 7.52497 7.52513C8.18134 6.86875 9.07158 6.5 9.99984 6.5C10.9281 6.5 11.8183 6.86875 12.4747 7.52513C13.1311 8.1815 13.4998 9.07174 13.4998 10C13.4998 10.9283 13.1311 11.8185 12.4747 12.4749C11.8183 13.1313 10.9281 13.5 9.99984 13.5ZM17.4298 10.97C17.4698 10.65 17.4998 10.33 17.4998 10C17.4998 9.67 17.4698 9.34 17.4298 9L19.5398 7.37C19.7298 7.22 19.7798 6.95 19.6598 6.73L17.6598 3.27C17.5398 3.05 17.2698 2.96 17.0498 3.05L14.5598 4.05C14.0398 3.66 13.4998 3.32 12.8698 3.07L12.4998 0.42C12.4598 0.18 12.2498 0 11.9998 0H7.99984C7.74984 0 7.53984 0.18 7.49984 0.42L7.12984 3.07C6.49984 3.32 5.95984 3.66 5.43984 4.05L2.94984 3.05C2.72984 2.96 2.45984 3.05 2.33984 3.27L0.339839 6.73C0.209839 6.95 0.26984 7.22 0.45984 7.37L2.56984 9C2.52984 9.34 2.49984 9.67 2.49984 10C2.49984 10.33 2.52984 10.65 2.56984 10.97L0.45984 12.63C0.26984 12.78 0.209839 13.05 0.339839 13.27L2.33984 16.73C2.45984 16.95 2.72984 17.03 2.94984 16.95L5.43984 15.94C5.95984 16.34 6.49984 16.68 7.12984 16.93L7.49984 19.58C7.53984 19.82 7.74984 20 7.99984 20H11.9998C12.2498 20 12.4598 19.82 12.4998 19.58L12.8698 16.93C13.4998 16.67 14.0398 16.34 14.5598 15.94L17.0498 16.95C17.2698 17.03 17.5398 16.95 17.6598 16.73L19.6598 13.27C19.7798 13.05 19.7298 12.78 19.5398 12.63L17.4298 10.97Z"
              fill="white"
            />
          </svg>
          <span className={classes.activeLinkText} style={{marginLeft:'15px'}}>Управление</span>
        </div>

        
        <NavLink to="orders">
          <div className={classes.item}>
            <span
              className={
                location.pathname.includes("/orders")
                  ? classes.activeLinkText
                  : ""
              }
            >
             Текущие заказы
            </span>

            <Badge  badgeContent={orders || '0'}    
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor:"#005475", // Установка фона в синий или #005475 в зависимости от условия
                color:"white",// Установка цвета текста в белый
                border: "2px solid white",// Установка белого контура
                width: '22px', // Изменение ширины
                height: '22px', // Изменение высоты
                borderRadius: '50%', // Сделать круглым
                opacity: location.pathname.includes("/orders") ? "1" : "0.5"
              },
              marginLeft:'30px'
            }}> 
            
            </Badge>

          </div>
        </NavLink>

        <NavLink to="archive">
          <div className={classes.item}>
            <span
              className={
                location.pathname.includes("/archive")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Архив заказов
            </span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft:'32px'}}
            >
              <path
                d="M10.35 17L16 11.35L14.55 9.9L10.33 14.13L8.23 12.03L6.8 13.45M6.5 20C4.98 20 3.68333 19.4767 2.61 18.43C1.53667 17.3767 1 16.0933 1 14.58C1 13.28 1.39 12.12 2.17 11.1C2.95667 10.08 3.98333 9.43 5.25 9.15C5.67 7.61667 6.50333 6.37667 7.75 5.43C9.00333 4.47667 10.42 4 12 4C13.9533 4 15.6067 4.68 16.96 6.04C18.32 7.39333 19 9.04667 19 11C20.1533 11.1333 21.1067 11.6333 21.86 12.5C22.62 13.3533 23 14.3533 23 15.5C23 16.7533 22.5633 17.8167 21.69 18.69C20.8167 19.5633 19.7533 20 18.5 20H6.5Z"
                fill="white"
                fill-opacity="0.5"
                className={classNames(
                  location.pathname.includes("/archive")
                    ? classes.activeLinkIcon
                    : ""
                )}
              />
            </svg>
          </div>
        </NavLink>

        <NavLink to="priceList">
          <div className={classes.item}>
            <span
              className={
                location.pathname.includes("/priceList")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Прайс-листы
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft:'44px'}}
            >
              <path
                d="M3 4H7V8H3V4ZM9 5V7H21V5H9ZM3 10H7V14H3V10ZM9 11V13H21V11H9ZM3 16H7V20H3V16ZM9 17V19H21V17H9Z"
                fill="white"
                fill-opacity="0.5"
                className={classNames(
                  location.pathname.includes("/priceList")
                    ? classes.activeLinkIcon
                    : ""
                )}
              />
            </svg>
          </div>
        </NavLink>

        <NavLink to="users">
          <div className={classes.item}>
            <span
              className={
                location.pathname.includes("/users")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Пользователи
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft:'34px'}}
            >
              <path
                d="M16 17.0001V19.0001H2V17.0001C2 17.0001 2 13.0001 9 13.0001C16 13.0001 16 17.0001 16 17.0001ZM12.5 7.50005C12.5 6.80782 12.2947 6.13113 11.9101 5.55556C11.5256 4.97998 10.9789 4.53138 10.3394 4.26647C9.69985 4.00157 8.99612 3.93226 8.31718 4.0673C7.63825 4.20235 7.01461 4.5357 6.52513 5.02518C6.03564 5.51466 5.7023 6.1383 5.56725 6.81724C5.4322 7.49617 5.50152 8.1999 5.76642 8.83944C6.03133 9.47899 6.47993 10.0256 7.0555 10.4102C7.63108 10.7948 8.30777 11.0001 9 11.0001C9.92826 11.0001 10.8185 10.6313 11.4749 9.97493C12.1313 9.31855 12.5 8.42831 12.5 7.50005ZM15.94 13.0001C16.5547 13.4758 17.0578 14.0805 17.4137 14.7716C17.7696 15.4626 17.9697 16.2233 18 17.0001V19.0001H22V17.0001C22 17.0001 22 13.3701 15.94 13.0001ZM15 4.00005C14.3117 3.99622 13.6385 4.20201 13.07 4.59005C13.6774 5.43879 14.0041 6.45634 14.0041 7.50005C14.0041 8.54377 13.6774 9.56132 13.07 10.4101C13.6385 10.7981 14.3117 11.0039 15 11.0001C15.9283 11.0001 16.8185 10.6313 17.4749 9.97493C18.1313 9.31855 18.5 8.42831 18.5 7.50005C18.5 6.57179 18.1313 5.68156 17.4749 5.02518C16.8185 4.3688 15.9283 4.00005 15 4.00005Z"
                fill="white"
                fill-opacity="0.5"
                className={
                  location.pathname.includes("/users")
                    ? classes.activeLinkIcon
                    : ""
                }
              />
            </svg>
          </div>
        </NavLink>

        <NavLink to="deposits">
          <div className={classes.item}>
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
      </div>
    </div>
  );
}
