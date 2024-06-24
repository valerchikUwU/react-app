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
  IconButton,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import plus from "./image/add.svg";
import Add from "./Add.jsx";
import ModalRules from "./ModalRules.jsx";
import ModalRemains from "./ModalRemains.jsx";
import {
  getBalance,
  getComission,
  getRules,
} from "../../../../BLL/superAdmin/comissionSlice.js";
import { getDepositBalance } from "../../../../BLL/superAdmin/depositSuperAdminSlice.js";

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

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});
export default function Commission() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [openDialog, setOpenDialog] = useState(false);
  const [openStates, setOpenStates] = useState({});
  const [openStatesRemains, setOpenStatesRemains] = useState({});
  const [modal, setModal] = useState();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const commision = useSelector(
    (state) => state.superAdminCommision?.commision
  );
  const dummyKey = useSelector((state) => state.superAdminCommision?.dummyKey);

  useEffect(() => {
    dispatch(getComission(accountId));
  }, [dispatch, accountId, dummyKey]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    // Find the first open modal
    let openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId

      dispatch(
        getRules({ accountId: accountId, commisionRecieverId: openModalId })
      );
    }
  }, [openStates, dispatch, dummyKey]);

  useEffect(() => {
    // Find the first open modal
    let openModalId = Object.keys(openStatesRemains).find((id) => openStatesRemains[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(
        getBalance({ accountId: accountId, commisionRecieverId: openModalId })
      );
    }
  }, [openStatesRemains, dispatch, dummyKey]);

  const OpenModalRules = (id) => {
    setModal("rules");
    return setOpenStates({ ...openStates, [id]: true });
  };

  const handleCloseModalRules = (id) =>
    setOpenStates({ ...openStates, [id]: false });

  
  const OpenModalRemains = (id) => {
    setModal("remains");
    return setOpenStatesRemains({ ...openStatesRemains, [id]: true });
  };

  const handleCloseModalRemains = (id) =>
    setOpenStatesRemains({ ...openStatesRemains, [id]: false });

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
                Получатель
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
                Правила начисления
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
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                <IconButton onClick={() => handleOpenDialog()}>
                  <img src={plus} alt="плюс" />
                </IconButton>
              </StyledTableCellHead>
            </TableRow>
          </TableHead>

          <TableBody>
            {commision?.map((element) => (
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
                <TableCell
                  onClick={() => OpenModalRules(element.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {element.rulesQuantity}
                </TableCell>
                <TableCell
                  onClick={() => OpenModalRemains(element.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Остаток
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Add isOpen={openDialog} close={setOpenDialog}></Add>
      <ModalRules
        openStates={openStates}
        close={handleCloseModalRules}
        commision={commision}
      ></ModalRules>
      <ModalRemains
        openStates={openStatesRemains}
        close={handleCloseModalRemains}
        commision={commision}
      ></ModalRemains>
    </div>
  );
}
