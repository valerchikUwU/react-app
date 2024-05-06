import React from "react";
import classes from "./Completed.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompleted } from "../../../BLL/completedSlice";
import { useParams } from 'react-router-dom';

export default function Completed() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
 
  useEffect(() => {
     dispatch(getCompleted(accountId)); // Передаем accountId в getCompleted
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const list = useSelector((state) => state.completed.completed);

  return (
    <div>
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
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                №
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Академия
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Дата
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Сумма
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                № счета
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            list.map((element) => {
              return (
                <TableRow key={element.id}>
                  <TableCell className={classes.textBody}>
                    {element.orderNumber}
                  </TableCell>
                  <TableCell className={classes.textBody}>
                    {element.organizationName}
                  </TableCell>
                  <TableCell className={classes.textBody}>
                    {element.dispatchDate}
                  </TableCell>
                  <TableCell className={classes.textBody}>
                    {element.SUM} &#x20bd;
                  </TableCell>
                  <TableCell className={classes.textBody}>
                    {element.billNumber}
                  </TableCell>
                </TableRow>
              );
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
