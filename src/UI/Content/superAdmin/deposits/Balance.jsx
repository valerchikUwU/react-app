import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import add from "../commission/image/add.svg";
import exit from "../commission/image/exit.svg";
import { styled } from "@mui/system";
import AddDeposit from "./AddDeposit";


// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function Balance({ openStates, close, deposits, accountId, changeDummyKey }) {
  const organization = useSelector(
    (state) => state.superAdminDeposits.organization
  );
  const orders = useSelector((state) => state.superAdminDeposits.orders);
  const [modalAddDeposit, setModalAddDeposit] = useState(false);

const openAddDeposit = () => {
  setModalAddDeposit(true);
}
const closeAddDeposit = () => {
  setModalAddDeposit(false);
}
  return (
    <>
      {deposits.map((element) => (
        <Modal open={openStates[element.id]} key={element.id}>
          <div
            style={{
              display: "grid",
              gridTemplateAreas: '"icon" "box"',
              gridGap: "10px",
              placeItems: "center",
              height: "auto",
              position: "absolute",
              top: "45%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              paddingTop: "5%",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: "0 0 24px rgba(0, 0, 0, 0.5)",
                padding: "4px",
                borderRadius: "10px",
                gridArea: "box",
                alignSelf: "center",
                position: "absolute",
                maxHeight: "calc(100vh - 200px)",
                overflow: "visible",
                scrollbarWidth: "thin",
                scrollbarColor: "#005475 #FFFFFF",
              }}
            >

          <IconButton
              onClick={() => close(element.id)}
              sx={{
                position: "absolute",
                float: "right",
                top: "-38px",
                right: "-40px",
              }}
            >
              <img src={exit} alt="закрыть" />
            </IconButton>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#005475",
                    borderBottom: "3px solid #005475",
                    marginTop: "10px",
                  }}
                >
                  Получатель {organization.organizationName}
                </Typography>
              </Box>

              <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TextHeader
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Дата
                      </TextHeader>
                      <TextHeader
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Счёт №
                      </TextHeader>
                      <TextHeader
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Поступление
                      </TextHeader>
                      <TextHeader
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Списание
                      </TextHeader>
                      <TextHeader
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Остаток
                      </TextHeader>
                      <TextHeader
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        <IconButton onClick={() => openAddDeposit()}>
                          <img src={add} alt="плюс" />
                        </IconButton>
                      </TextHeader>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {orders?.map((item, index) => (
                      <TableRow>
                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: index === 0 ? "#005475" : "#333333",
                            textAlign: "center",
                          }}
                        >
                          {item.formattedDispatchDate}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: index === 0 ? "#005475" : "#333333",
                            textAlign: "center",
                          }}
                        >
                          {item.billNumber}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: index === 0 ? "#005475" : "#333333",
                            textAlign: "center",
                          }}
                        >
                          {item.Deposit}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: index === 0 ? "#005475" : "#333333",
                            textAlign: "center",
                          }}
                        >
                        {item.Spisanie}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: index === 0 ? "#005475" : "#333333",
                            textAlign: "center",
                          }}
                        >
                        {}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // Плавное выравнивание кнопок справа
                  marginTop: "60px",
                  marginRight: "10px",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
              </Box>
            </Box>
          </div>
        </Modal>
      ))}
    <AddDeposit open={modalAddDeposit} close={closeAddDeposit} organizationCustomerId={organization.id} accountId={accountId} changeDummyKey={changeDummyKey}></AddDeposit>
    </>
  );
}
