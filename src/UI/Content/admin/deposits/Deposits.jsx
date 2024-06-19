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
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { getDeposit } from "../../../../BLL/admin/depositAdminSlice";
import CircularProgressCustom from "../../styledComponents/CircularProgress";

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  color: "#333333BF",
  textAlign: "center",
}));

export default function Deposits() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getDeposit(accountId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const deposits = useSelector((state) => state.adminDeposit.deposits);

  return (
    <div>
      {isLoading ? (
        <CircularProgressCustom value={"55%"}></CircularProgressCustom>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            height: "calc(100vh - 90px)",
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#005475BF #FFFFFF",
          }}
        >
          <Table stickyHeader sx={{ width: "50%" }} aria-label="simple table">
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
                  Академии
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
                  Остаток
                </StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {deposits.map((element) => (
                <TableRow key={element.id}>
                  <StyledTableCellBody>
                    {element.organizationName}
                  </StyledTableCellBody>
                  <StyledTableCellBody>
                    {element.allDeposits - element.SUM}
                  </StyledTableCellBody>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
