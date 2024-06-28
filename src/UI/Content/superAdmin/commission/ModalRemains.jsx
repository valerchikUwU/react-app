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
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import add from "./image/add.svg";
import AddReciever from "./AddReciever";
import CircularProgressCustom from "../../styledComponents/CircularProgress";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function ModalRemains({
  isLoadingRemains,
  openStates,
  close,
  commision,
}) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [addModal, setAddModal] = useState(false);

  const commisionReceiver = useSelector(
    (state) => state.superAdminCommision.commisionReceiver || {}
  );
  const allPostyplenie = useSelector(
    (state) => state.superAdminCommision?.allPostyplenie
  );
  const operations = useSelector(
    (state) => state.superAdminCommision?.operations
  );
  const resetStates = () => {};

  const handleSave = () => {
    dispatch();
  };

  const addReciever = () => {
    setAddModal(true);
  };
  let ostatok = 0;
  return (
    <div>
      {isLoadingRemains ? (
        <CircularProgressCustom value={"55%"}> </CircularProgressCustom>
      ) : (
        <>
          {commision.map((element) => (
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
                    minHeight: "500px",
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

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
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
                      Получатель {commisionReceiver.name}
                    </Typography>
                  </Box>

                  <TableContainer
                    component={Paper}
                    sx={{
                      maxHeight: "calc(100vh - 450px)",
                      minHeight: "300px",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#005475 #FFFFFF",
                      marginTop: "40px",
                    }}
                  >
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
                            <IconButton onClick={addReciever}>
                              <img src={add} alt="плюс" />
                            </IconButton>
                          </TextHeader>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {allPostyplenie?.map((item, index) => (
                          <TableRow>
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333333",
                                textAlign: "center",
                              }}
                            >
                              {item.formattedDate}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333333",
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
                                color: "#333333",
                                textAlign: "center",
                              }}
                            >
                              {item.Postyplenie}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333333",
                                textAlign: "center",
                              }}
                            >
                             
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                      <TableBody>
                        {operations?.map((item, index) => (
                          <TableRow>
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333333",
                                textAlign: "center",
                              }}
                            >
                              {item.formattedDateOfOperation}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333333",
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
                                color: "#333333",
                                textAlign: "center",
                              }}
                            ></TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333333",
                                textAlign: "center",
                              }}
                            >
                              {item.Spisanie}
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
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#005475",
                        color: "#FFFFFF",
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#00435d",
                        },
                      }}
                    >
                      Сохранить
                    </Button>

                    <Button
                      onClick={resetStates}
                      sx={{
                        variant: "contained",
                        textTransform: "none",
                        backgroundColor: "#CCCCCC",
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        border: 0,
                        "&:hover": {
                          backgroundColor: "#8E8E8E",
                          border: 0,
                        },
                      }}
                    >
                      Отменить
                    </Button>
                  </Box>
                </Box>
              </div>
            </Modal>
          ))}
        </>
      )}
      <AddReciever
        isOpen={addModal}
        close={setAddModal}
        commisionRecieverId={commisionReceiver.id}
      ></AddReciever>
    </div>
  );
}
