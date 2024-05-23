import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, IconButton, TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import add from "./add.svg";
import { getPriceList } from "../../../../BLL/admin/priceListSlice";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
  paddingY: 1,
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "#fff",
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#333333BF",
  textAlign: "center",
}));
const TableCellName = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#FFFFFF",
  textAlign: "center",
  colSpan: 6,
  backgroundColor: "#005475",
}));

export default function PriceList() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  useEffect(() => {
    dispatch(getPriceList(accountId));
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const pricesInit = useSelector((state) => state.adminPriceList.pricesInit);
  const pricesMain = useSelector((state) => state.adminPriceList.pricesMain);
  const pricesForEmployers = useSelector((state) => state.adminPriceList.pricesForEmployers);



  return (
    <div>
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DesktopDatePicker inputFormat="MM/DD/YYYY" /> 
</LocalizationProvider>

      <IconButton sx={{  float: 'right'}}>
        <img src={add} alt="+"/>
      </IconButton>

      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 90px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475BF #FFFFFF",
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCellHead>№</StyledTableCellHead>

              <StyledTableCellHead>Курс</StyledTableCellHead>

              <StyledTableCellHead>Полное название</StyledTableCellHead>

              <StyledTableCellHead>Доступ</StyledTableCellHead>

              <StyledTableCellHead>Доп.буклет</StyledTableCellHead>

              <StyledTableCellHead>Дата</StyledTableCellHead>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCellName colSpan={6}>Начальные</TableCellName>
            </TableRow>
            

            {pricesInit.map((element, index) => (
              <TableRow key={pricesInit.id}>
                <StyledTableCellBody>{++index}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.Product.abbreviation}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.Product.name}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceAccess} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceBooklet} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.activationDate}
                </StyledTableCellBody>
              </TableRow>
            ))}

            <TableRow>
              <TableCellName colSpan={6}>Основные</TableCellName>
            </TableRow>

            {pricesMain.map((element, index) => (
              <TableRow key={pricesMain.id}>
                <StyledTableCellBody>{++index}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.Product.abbreviation}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.Product.name}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceAccess} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceBooklet} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.activationDate}
                </StyledTableCellBody>
              </TableRow>
            ))}

            <TableRow>
              <TableCellName colSpan={6}>Для персонала</TableCellName>
            </TableRow>

            {pricesForEmployers.map((element, index) => (
              <TableRow key={pricesForEmployers.id}>
                <StyledTableCellBody>{++index}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.Product.abbreviation}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.Product.name}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceAccess} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceBooklet} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.activationDate}
                </StyledTableCellBody>
              </TableRow>
            ))}

           
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
