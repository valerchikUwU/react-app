import React from 'react'
import QR from './QR-code.svg'
import classes from "./Main.module.css";
export default function Main() {
  return (
    <div className={classes.main}>
        <div className={classes.qr}>Для входа отсканируйте QR-код</div>
        <img src={QR} alt="QR code" className={classes.img}/>
        <div className={classes.link}><a href=''>Или перейдите по ссылке</a></div> 
    </div>
  )
}
