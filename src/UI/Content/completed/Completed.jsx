import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompleted } from "../../../BLL/completedSlice";
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from '@mui/system';

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: '16px',
  fontWeight: 600,
  color: '#005475',
  borderBottom: '3px solid #005475BF',
  textAlign: 'center',
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: '16px',
  fontWeight: 600,
  color: '#333333BF',
  textAlign: 'center',
}));

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
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                №
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Академия
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Дата
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Сумма
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                № счета
              </StyledTableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((element) => (
              <TableRow key={element.id}>
                <StyledTableCellBody>
                  {element.orderNumber}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.organizationName}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.dispatchDate}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.SUM} &#x20bd;
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.billNumber}
                </StyledTableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
