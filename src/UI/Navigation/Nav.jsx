import classes from "./Nav.module.css";
import React, {useState} from "react";
import Logo from "./logo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getWork } from "../../BLL/workSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



export default function Nav() {
  
  const location = useLocation();
  const { accountId } = useParams();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.work.work);
  const [isHovered, setIsHovered] = useState(false);

// Отслеживаем изменения в accountId для обновления списка работ
useEffect(() => {
  dispatch(getWork(accountId));
}, [accountId, dispatch]); // Используем accountId вместо list
  

  return (
    <div className={classes.nav}>
      <img src={Logo} alt="Logo" className={classes.logo} />

      <div className={classes.list}>
  
          <div className={classes.itemCart}>
            <svg
              width="28"
              height="30"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={classes.cart}
            >
              <g filter="url(#filter0_d_138_161)">
                <path
                  d="M20 18C18.89 18 18 18.89 18 20C18 20.5304 18.2107 21.0391 18.5858 21.4142C18.9609 21.7893 19.4696 22 20 22C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20C22 18.89 21.1 18 20 18ZM4 2V4H6L9.6 11.59L8.24 14.04C8.09 14.32 8 14.65 8 15C8 15.5304 8.21071 16.0391 8.58579 16.4142C8.96086 16.7893 9.46957 17 10 17H22V15H10.42C10.3537 15 10.2901 14.9737 10.2432 14.9268C10.1963 14.8799 10.17 14.8163 10.17 14.75C10.17 14.7 10.18 14.66 10.2 14.63L11.1 13H18.55C19.3 13 19.96 12.58 20.3 11.97L23.88 5.5C23.95 5.34 24 5.17 24 5C24 4.73478 23.8946 4.48043 23.7071 4.29289C23.5196 4.10536 23.2652 4 23 4H8.21L7.27 2M10 18C8.89 18 8 18.89 8 20C8 20.5304 8.21071 21.0391 8.58579 21.4142C8.96086 21.7893 9.46957 22 10 22C10.5304 22 11.0391 21.7893 11.4142 21.4142C11.7893 21.0391 12 20.5304 12 20C12 18.89 11.1 18 10 18Z"
                  fill="white"
                  fill-opacity="1"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_138_161"
                  x="-1"
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
                    result="effect1_dropShadow_138_161"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_138_161"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span className={classes.activeLinkText}>
              Мои заказы
            </span>
          </div>

        <NavLink to="new">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/new") ? classes.activeLinkText : ""
              }
            >
              Новый
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={classes.add}
            >
              <path
                d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM13 7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                fill="white"
                fill-opacity="0.5"
                className={classNames(
                  location.pathname.includes("/new")
                    ? classes.activeLinkIcon
                    : ""
                )}
              />
            </svg>
          </div>
        </NavLink>

        <NavLink to="work">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/work")
                  ? classes.activeLinkText
                  : ""
              }
            >
              В работе
            </span>
            
            <Badge  badgeContent={list.length ? list.length : "0" }    
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor:"#005475", // Установка фона в синий или #005475 в зависимости от условия
                color:"white",// Установка цвета текста в белый
                border: "2px solid white",// Установка белого контура
                width: '22px', // Изменение ширины
                height: '22px', // Изменение высоты
                borderRadius: '50%', // Сделать круглым
                opacity: location.pathname.includes("/work") ? "1" : "0.5"
              },
              marginLeft:'95px'
            }}> 
            
            </Badge>
           
          </div>
        </NavLink>

        <NavLink to="completed">
          <div className={`${classes.item} ${classes.hoverEffect}`}>
            <span
              className={
                location.pathname.includes("/completed")
                  ? classes.activeLinkText
                  : ""
              }
            >
              Завершенные
            </span>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={classes.cloud}
            >
              <path
                d="M9.35 13L15 7.35L13.55 5.9L9.33 10.13L7.23 8.03L5.8 9.45M5.5 16C3.98 16 2.68333 15.4767 1.61 14.43C0.536667 13.3767 0 12.0933 0 10.58C0 9.28 0.39 8.12 1.17 7.1C1.95667 6.08 2.98333 5.43 4.25 5.15C4.67 3.61667 5.50333 2.37667 6.75 1.43C8.00333 0.476667 9.42 0 11 0C12.9533 0 14.6067 0.68 15.96 2.04C17.32 3.39333 18 5.04667 18 7C19.1533 7.13333 20.1067 7.63333 20.86 8.5C21.62 9.35333 22 10.3533 22 11.5C22 12.7533 21.5633 13.8167 20.69 14.69C19.8167 15.5633 18.7533 16 17.5 16H5.5Z"
                fill="white"
                fill-opacity="0.5"
                className={classNames(
                  location.pathname.includes("/completed")
                    ? classes.activeLinkIcon
                    : ""
                )}
              />
            </svg>
          </div>
        </NavLink> 
      </div>
    </div>
  );
}
