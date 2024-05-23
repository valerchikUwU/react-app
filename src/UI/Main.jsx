import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Main.module.css";
import QRCode from "qrcode.react"; // Импортируем QRCode

export default function Main() {
  const [data, setData] = useState({ token: "", sessionId: "" });
  const [ws, setWs] = useState(null); // Добавляем состояние для WebSocket соединения

  useEffect(() => {
    // Функция для выполнения GET запроса
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/homepage"
        );
        // Обновляем состояние с полученными данными
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Вызываем функцию fetchData при монтировании компонента
    fetchData();
  }, []); // Убрано зависимость от data.sessionId, так как fetchData вызывается один раз при монтировании

  useEffect(() => {
    // Устанавливаем WebSocket соединение после получения данных
    if (data.sessionId) {
      const wsUrl = `ws://localhost:8080?sessionId=${data.sessionId}`;
      const wsConnection = new WebSocket(wsUrl);

      setWs(wsConnection); // Сохраняем WebSocket соединение в состоянии

      // Обработка событий WebSocket соединения
      wsConnection.onopen = () => {
        console.log("WebSocket соединение открыто");
      };

      wsConnection.onmessage = (event) => {
        console.log("Получено сообщение:", event.data);
        // Анализируем полученное сообщение
        const message = JSON.parse(event.data);

        console.log(message.message);
        if (message !== "false") {
          // Если сообщение не равно 'false', выполняем редирект
          window.location.href = `#/${message.message}/user/new/start`;
        } else {
          // Если сообщение равно 'false', выводим ошибку
          alert("Ошибка аутентификации");
        }
      };

      wsConnection.onclose = () => {
        console.log("WebSocket соединение закрыто");
      };

      // Очистка при размонтировании компонента
      return () => {
        wsConnection.close();
      };
    }
  }, [data.sessionId]); // Зависимость от sessionId, чтобы обновлять соединение при изменении sessionId

  const qrUrl = `https://t.me/AcademyStrategBot?start=${data.token}-${data.sessionId}`;
  return (
    <div className={classes.main}>
      <div className={classes.qr}>Для входа отсканируйте QR-код</div>
      {/* Используем QRCode вместо статической картинки */}
      <QRCode value={qrUrl}  style={{marginTop:'25px'}}/>
      <div className={classes.link}>
        <a href={qrUrl} target="_blank">
          Или перейдите по ссылке
        </a>
      </div>

      {/* Отображаем полученные данные */}
      <div>Token: {data.token}</div>
      <div>Session ID: {data.sessionId}</div>
    </div>
  );
}
