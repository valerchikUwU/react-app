import React, { useEffect } from "react";
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
import { getUser } from "../../../../BLL/admin/userSlice";
import plus from "./image/add.svg";
import check from "./image/checboxCheck.svg";
import unCheck from "./image/checbox.svg";
import IconButton from "@mui/material/IconButton";

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
  fontWeight: 600,
  color: "#333333BF",
  textAlign: "center",
}));

export default function Users() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  useEffect(() => {
    dispatch(getUser(accountId));
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const users = useSelector((state) => state.adminUser.users);

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
                Имя
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
                Был
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
                Телефон
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
                Теллеграм
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
                <IconButton>
                  <img src={plus} alt="плюс" />
                </IconButton>
              </StyledTableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((element) => (
              <TableRow key={element.id}>
                <StyledTableCellBody>
                  {element.accountNumber}
                </StyledTableCellBody>
                <StyledTableCellBody>{element.firstName + ' ' + element.lastName}</StyledTableCellBody>
                <StyledTableCellBody>
                  {element.organizationList.map((organization, index, array) =>
                    index === array.length - 1
                      ? organization
                      : `${organization}, `
                  )}
                </StyledTableCellBody>
                <StyledTableCellBody>{element.formattedLastSeen}</StyledTableCellBody>
                <StyledTableCellBody>
                  {element.telephoneNumber}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.telegramId ? (
                    <img src={check} alt="есть" />
                  ) : (
                    <img src={unCheck} alt="нету" />
                  )}
                </StyledTableCellBody>

                <StyledTableCellBody></StyledTableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
