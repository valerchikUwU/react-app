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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import setting from "./setting.svg";
import { getReview } from "../../../../BLL/superAdmin/reviewSlice";
dayjs.locale("ru");

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}
const windowSet = () => {};
export default function Review() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const reviews = useSelector((state) => state.superAdminReview?.reviews);
  useEffect(() => {
    dispatch(getReview(accountId));
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs());

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
          <DesktopDatePicker
            sx={{ width: "250px" }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            label="Дата"
            format="DD/MM/YYYY - DD/MM/YYYY"
            showDaysOutsideCurrentMonth
            displayWeekNumber
            slots={{ day: Day }}
            slotProps={{
              day: (ownerState) => ({
                selectedDay: value,
                hoveredDay,
                onPointerEnter: () => setHoveredDay(ownerState.day),
                onPointerLeave: () => setHoveredDay(null),
              }),
            }}
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

            {reviews?.map((element) => (
              <TableCell
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  textAlign: "center",
                }}
              >
                {element.SUM}
              </TableCell>
            ))}
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
            {reviews?.map((element) => (
              <TableCell
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  textAlign: "center",
                }}
              >
                {element.totalQuantity}
              </TableCell>
            ))}
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
          {reviews?.map((element) => (
            <TableCell
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              {element.totalMainQuantity}
            </TableCell>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}
