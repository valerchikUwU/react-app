import React, { useEffect, useState } from 'react';
import QR from './qr.png';
import classes from "./Main.module.css";
import axios from 'axios';

export default function Main() {
  const [isChecking, setIsChecking] = useState(false);
  const [success, setSuccess] = useState(false);

  const checkAuthStatus = () => {
    console.log("111111111111111111111111111111111111111111111");
    axios.get(`http://localhost:3000/api/auth-status`)
     .then(response => {
        if (response.data.success) {
          const id = response.data.id;
          console.log("ID:", id);
          window.location.href = `/#/${id}/user/new/start`;
          setSuccess(true); // Установка success в true после успешного ответа
          console.log("11111111111111111111111111");
        }
      })
     .catch(error => {
        console.error('Error fetching auth status:', error);
      });
  };

  useEffect(() => {
    console.log("hfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    if (!success && isChecking) {
      const intervalId = setInterval(checkAuthStatus, 1); // Вызов каждую миллисекунду
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента или изменении isChecking
    }
  }, [isChecking, success]); // Добавляем success в зависимости useEffect

  const handleLinkClick = () => {
    setIsChecking(true);
  };

  return (
    <div className={classes.main}>
        <div className={classes.qr}>Для входа отсканируйте QR-код</div>
        <img src={QR} alt="QR code" className={classes.img}/>
        <div className={classes.link}>
          <a href="https://t.me/AcademyStrategBot" onClick={handleLinkClick}>Или перейдите по ссылке</a>
        </div> 
    </div>
  )
}
