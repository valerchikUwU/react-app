import React from 'react'
import QR from './qr.png'
import classes from "./Main.module.css";
export default function Main() {
  return (
    <div className={classes.main}>
        <div className={classes.qr}>Для входа отсканируйте QR-код</div>
        <img src={QR} alt="QR code" className={classes.img}/>
        <div className={classes.link}><a href="https://t.me/AcademyStrategBot">Или перейдите по ссылке</a></div> 
    </div>
  )
}
