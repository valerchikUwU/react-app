import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { getPayee } from "../../../../BLL/superAdmin/payeeSlice";
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

export default function Reciever() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const payees = useSelector(
    (state) => state.superAdminPayee?.payees
  );
  useEffect(() => {
    dispatch(getPayee(accountId));
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей
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
      <Table stickyHeader sx={{ width: "30%" }} aria-label="simple table">
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
              Получатель
            </StyledTableCellHead>
          </TableRow>
        </TableHead>

        <TableBody>
          {payees?.map((element) => (
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
                {element.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>
  )
}
