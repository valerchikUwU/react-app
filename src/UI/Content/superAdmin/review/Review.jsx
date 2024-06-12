import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import setting from "./setting.svg";
import { getReview } from "../../../../BLL/superAdmin/reviewSlice";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";

dayjs.locale("ru");

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function Review() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const reviews = useSelector((state) => state.superAdminReview?.reviews);
  const SUM = useSelector((state) => state.superAdminReview?.SUM);
  const totalQuantity = useSelector(
    (state) => state.superAdminReview?.totalQuantity
  );
  const totalMainQuantity = useSelector(
    (state) => state.superAdminReview?.totalMainQuantity
  );

  const [date, setDate] = useState([dayjs().subtract(1, "day"), dayjs()]);

  useEffect(() => {
    dispatch(getReview({ accountId: accountId, date: date }));
  }, [dispatch, accountId, date]); // Добавляем accountId в список зависимостей

  const windowSet = () => {
    dispatch();
  };
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: 600,
            color: "#005475",
            textAlign: "center",
            marginRight: "30px",
            marginLeft: "30px",
          }}
        >
          Дата:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            startText="Начальная дата"
            endText="Конечная дата"
            format="DD/MM/YYYY"
            value={date}
            onChange={(newDates) => {
              // Обновляем состояние с новыми датами
              setDate(newDates);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <input {...startProps} />
                <input {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>

        <IconButton onClick={() => windowSet()} sx={{ marginLeft: "20px" }}>
          <img src={setting} alt="настройки" />
        </IconButton>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 50vh)",
          width: "calc(100vw - 30vw)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475BF #FFFFFF",
          marginTop: "50px",
          marginLeft: "30px",
        }}
      >
        <Table stickyHeader sx={{ width: "20%" }} aria-label="simple table">
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              Всего поступлений
            </TableCell>

            <TableCell
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              {SUM}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              Всего штук
            </TableCell>

            <TableCell
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              {totalQuantity}
            </TableCell>
          </TableRow>

          <TableCell
            sx={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 600,
              color: "black",
              textAlign: "center",
            }}
          >
            Всего основных, шт.
          </TableCell>

          <TableCell
            sx={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 600,
              color: "black",
              textAlign: "center",
            }}
          >
            {totalMainQuantity}
          </TableCell>
        </Table>
      </TableContainer>
    </div>
  );
}
