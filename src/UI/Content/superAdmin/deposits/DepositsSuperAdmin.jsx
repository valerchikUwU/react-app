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
import {
  getDeposit,
  getDepositBalance,
} from "../../../../BLL/superAdmin/depositSuperAdminSlice";
import CircularProgressCustom from "../../styledComponents/CircularProgress";
import Balance from "./Balance.jsx";
import cursor from "./cursor-click.svg";

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
}));

export default function DepositsSuperAdmin() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [isLoading, setIsLoading] = useState(false);
  const [openStates, setOpenStates] = useState({});
  const deposits = useSelector((state) => state.superAdminDeposits.deposits);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getDeposit(accountId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    // Find the first open modal
    let openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      console.log(openModalId);
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(
        getDepositBalance({
          accountId: accountId,
          organizationCustomerId: openModalId,
        })
      );
    }
  }, [openStates, dispatch]);

  const OpenModal = (id) => {
    return setOpenStates({ ...openStates, [id]: true });
  };

  const handleCloseModal = (id) =>
    setOpenStates({ ...openStates, [id]: false });

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
                  <TableCell
                    sx={{
                      fontFamily: '"Montserrat"',
                      fontSize: "16px",
                      color: "#005475",
                      textAlign: "center",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "",
                      transition: "color 0.5s ease",
                    }}
                    onClick={() => OpenModal(element.id)}
                  >
                    {openStates[element.id] ?<img src={cursor} alt="курсор" style={{float:"left"}}></img> : null }
                    {element.organizationName}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontFamily: '"Montserrat"',
                      fontSize: "16px",
                      color: "#005475",
                      textAlign: "center",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "",
                      transition: "color 0.5s ease",
                    }}
                    onClick={() => OpenModal(element.id)}
                  >
                    {element.allDeposits - element.SUM}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Balance
        openStates={openStates}
        close={handleCloseModal}
        deposits={deposits}
      ></Balance>
    </div>
  );
}
