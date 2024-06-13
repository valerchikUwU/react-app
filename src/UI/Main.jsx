import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Main.module.css";
import QRCode from "qrcode.react"; // Импортируем QRCode
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [data, setData] = useState({ token: "", sessionId: "" });
  const [ws, setWs] = useState(null); // Добавляем состояние для WebSocket соединения
  const navigate = useNavigate();

  useEffect(() => {
    // Функция для выполнения GET запроса
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/homepage");
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
    if (data.isLogged === true) {
      switch (data.accountRoleId) {
        case 1:
          window.location.href = `#/${data.accountId}/superAdmin/comission`;
          break;
        case 2:
          window.location.href = `#/${data.accountId}/admin/orders`;
          break;
        case 3:
          window.location.href = `#/${data.accountId}/user/new/start`;
          break;
        default:
          window.location.href = `#/`;
      }
    }
    // Устанавливаем WebSocket соединение после получения данных
    if (data.sessionId) {
      const wsUrl = `ws://localhost:3002?sessionId=${data.sessionId}`;
      // const wsUrl = `ws://localhost:8080?sessionId=${data.sessionId}`;
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
        if (message !== "false") {
          // Если сообщение не равно 'false', выполняем редирект
          switch (data.accountRoleId) {
            case 1:
              window.location.href = `#/${data.accountId}/superAdmin/comission`;
              window.location.reload();
              break;
            case 2:
              window.location.href = `#/${data.accountId}/admin/orders`;
              window.location.reload();
              break;
            case 3:
              window.location.href = `#/${data.accountId}/user/new/start`;
              window.location.reload();
              break;
            default:
              window.location.href = `#/`;
              window.location.reload();
          }
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

  // const qrUrl = `https://t.me/AcademyStrategBot?start=${data.token}-${data.sessionId}`;
  const qrUrl = `tg://resolve?domain=AcademyStrategBot&start=${encodeURIComponent(
    data.token
  )}-${encodeURIComponent(data.sessionId)}`;
  return (
    <div className={classes.main}>
      <div className={classes.qr}>Для входа отсканируйте QR-код</div>
      {/* Используем QRCode вместо статической картинки */}
      <QRCode value={qrUrl} style={{ marginTop: "25px" }} />
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
