import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompleted } from "../../../BLL/completedSlice";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import CircularProgressCustom from "../styledComponents/CircularProgress";
import { getWorkModal } from "../../../BLL/workSlice";
import check from "./image/check.svg";
import checkbox from "./image/checkbox.svg";
import exit from "./image/exit.svg";
import cursor from "./image/cursor-click.svg";
import classes from './Completed.module.css'

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
  opacity: "0.75",

  // Добавляем класс hoverEffect для применения стилей при наведении
  "&.hoverEffect": {
    transition: "background-color 0.3s ease",
  },
  "&.hoverEffect:hover": {
    backgroundColor: "#afeeee", // Более темный оттенок #005475
  },
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  color: "#333333BF",
  textAlign: "center",
  opacity: "0.75",
}));

export default function Completed() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCompleted(accountId)).then(() => setIsLoading(false)); // Передаем accountId в getCompleted
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const list = useSelector((state) => state.completed.completed);
  const listModalTitles = useSelector(
    (state) => state.work?.workModalTitles || []
  );

  const [openStates, setOpenStates] = useState({});
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [sortedArchive, setSortedArchive] = useState([...list]);
  const [sumForOneTitle, setSumForOneTitle] = useState({});

  const allIds = listModalTitles.map((row) => row.id);
  const totalSum = allIds.reduce(
    (acc, id) => acc + (sumForOneTitle[id] || 0),
    0
  );

  useEffect(() => {
    // Инициализация sumForOneTitle

    const initialSumForOneTitle = listModalTitles.reduce((acc, row) => {
      acc[row.id] = parseFloat(row.SumForOneTitle || 0);
      return acc;
    }, {});

    setSumForOneTitle(initialSumForOneTitle);
  }, [
    listModalTitles,
  ]);

  const OpenModal = (id) => {
    setIsLoadingModal(true);
    setOpenStates({ ...openStates, [id]: true });
  };

  const handleCloseModal = (id) =>
    setOpenStates({ ...openStates, [id]: false });

  useEffect(() => {
    setSortedArchive([...list]);
  }, [list]);


  useEffect(() => {
    // Find the first open modal
    const openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(
        getWorkModal({ accountId: accountId, orderId: openModalId })
      ).then(() => {
        setIsLoadingModal(false);
      });
    }
  }, [openStates, dispatch]);

  const sortNumber = (name) => {
    const sortedData = [...sortedArchive];
    switch (name) {
      case "Number":
        sortedData.sort((a, b) => {
          // Сначала проверяем статус
          if (a.status === "Черновик" && b.status !== "Черновик") {
            return -1;
          }
          if (a.status !== "Черновик" && b.status === "Черновик") {
            return 1;
          }
          if (
            a.status === "Черновик депозита" &&
            b.status !== "Черновик депозита"
          ) {
            return -1;
          }
          if (
            a.status !== "Черновик депозита" &&
            b.status === "Черновик депозита"
          ) {
            return 1;
          }

          // Затем сортируем по номеру заказа
          if (a.orderNumber > b.orderNumber) {
            return 1;
          } else if (a.orderNumber < b.orderNumber) {
            return -1;
          }
          return 0;
        });
        setSortedArchive(sortedData);
        break;

      case "organizationName":
        sortedData.sort((a, b) => {
          // Сначала проверяем статус
          if (a.status === "Черновик" && b.status !== "Черновик") {
            return -1;
          }
          if (a.status !== "Черновик" && b.status === "Черновик") {
            return 1;
          }
          if (
            a.status === "Черновик депозита" &&
            b.status !== "Черновик депозита"
          ) {
            return -1;
          }
          if (
            a.status !== "Черновик депозита" &&
            b.status === "Черновик депозита"
          ) {
            return 1;
          }

          // Затем сортируем по полному имени
          if (a.organizationName > b.organizationName) {
            return 1;
          } else if (a.organizationName < b.organizationName) {
            return -1;
          }
          return 0;
        });
        setSortedArchive(sortedData);
        break;

      // Аналогично добавьте проверку статуса в остальные случаи...

      case "billNumber":
        sortedData.sort((a, b) => {
          // Сначала проверяем статус
          if (a.status === "Черновик" && b.status !== "Черновик") {
            return -1;
          }
          if (a.status !== "Черновик" && b.status === "Черновик") {
            return 1;
          }
          if (
            a.status === "Черновик депозита" &&
            b.status !== "Черновик депозита"
          ) {
            return -1;
          }
          if (
            a.status !== "Черновик депозита" &&
            b.status === "Черновик депозита"
          ) {
            return 1;
          }

          // Затем сортируем по номеру счета
          if (a.billNumber > b.billNumber) {
            return 1;
          } else if (a.billNumber < b.billNumber) {
            return -1;
          } else {
            if (a.dispatchDate > b.dispatchDate) {
              return 1;
            } else if (a.dispatchDate < b.dispatchDate) {
              return -1;
            }
            return 0;
          }
        });
        setSortedArchive(sortedData);
        break;

      case "formattedDispatchDate":
        sortedData.sort((a, b) => {
          if (a.status === "Черновик" && b.status !== "Черновик") {
            return -1;
          }
          if (a.status !== "Черновик" && b.status === "Черновик") {
            return 1;
          }
          if (
            a.status === "Черновик депозита" &&
            b.status !== "Черновик депозита"
          ) {
            return -1;
          }
          if (
            a.status !== "Черновик депозита" &&
            b.status === "Черновик депозита"
          ) {
            return 1;
          }

          if (a.dispatchDate > b.dispatchDate) {
            return 1;
          } else if (a.dispatchDate < b.dispatchDate) {
            return -1;
          }
          return 0;
        });
        setSortedArchive(sortedData);
        break;
    }
  };
  // Text Header
  const TextHeader = styled(TableCell)({
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight:'600',
    color: "#005475",
    borderBottom: "3px solid #005475",
    textAlign: "center",
  });
  const TableCellModal = styled(TableCell)({
    fontFamily: "Montserrat",
    fontSize: "16px",
    color: "#333333",
    textAlign: "center",
  });

  const TypographyStyle = styled(Typography)({
    color: "#333333",
    fontFamily: "'Montserrat'",
    fontSize: "16px",
    fontWeight: 700,
    float: "right",
    marginTop: "15px",
    marginRight: "15px",
    marginBottom: "15px",
  });

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
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCellHead
                  className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sortNumber("Number");
                  }}
                >
                  №
                </StyledTableCellHead>
                <StyledTableCellHead
                  className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sortNumber("organizationName");
                  }}
                >
                  Академия
                </StyledTableCellHead>
                <StyledTableCellHead
                  className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sortNumber("formattedDispatchDate");
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
                  className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sortNumber("billNumber");
                  }}
                >
                  № счета
                </StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedArchive.map((element) => (
                <TableRow key={element.id}>
                  <TableCell
                    onClick={() => OpenModal(element.id)}
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "transparent",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {element.orderNumber}
                  </TableCell>

                  <TableCell
                    onClick={() => OpenModal(element.id)}
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "transparent",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {element.organizationName}
                  </TableCell>
                  <TableCell
                    onClick={() => OpenModal(element.id)}
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "transparent",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {element.formattedDispatchDate}
                  </TableCell>
                  <TableCell
                    onClick={() => OpenModal(element.id)}
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",              
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "transparent",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {element.SUM} &#x20bd;
                  </TableCell>
                  <TableCell
                    onClick={() => OpenModal(element.id)}
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "transparent",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {element.billNumber}
                    {openStates[element.id] && (
                          <img src={cursor} alt="курсор" />
                        )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {isLoadingModal ? (
        <Modal open={true}>
          <CircularProgressCustom
            sx={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Modal>
      ) : (
        list.map((element) => (
          <Modal open={openStates[element.id] || false} key={element.id}>
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
                  width: "auto",
                  overflow: "visible",
                }}
                className={classes.modal}
              >
                <IconButton
                  onClick={() => handleCloseModal(element.id)}
                  sx={{
                    position: "absolute",
                    float: "right",
                    top: "-38px",
                    right: "-40px",
                  }}
                >
                  <img src={exit} alt="закрыть" />
                </IconButton>

                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: "calc(100vh - 200px)",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#005475 #FFFFFF",
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
                          Курс
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
                          Доступ
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
                          Поколение
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
                          Доп. буклет
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
                          Количество
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
                          Цена
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
                          Сумма
                        </TextHeader>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listModalTitles.map((row) => (
                        <TableRow key={row.id}>
                          <TableCellModal>
                            {row.product.abbreviation}
                          </TableCellModal>
                          <TableCellModal>{row.accessType}</TableCellModal>
                          <TableCellModal>{row.generation}</TableCellModal>
                          <TableCellModal>
                            {row.addBooklet ? (
                              <img src={check} alt="галка" />
                            ) : (
                              <img
                                src={checkbox}
                                alt="галка"
                                style={{ opacity: "0.6" }}
                              />
                            )}
                          </TableCellModal>
                          <TableCellModal>{row.quantity}</TableCellModal>
                          <TableCellModal>
                            {row.PriceForOneProduct} &#x20bd;
                          </TableCellModal>
                          <TableCellModal>
                            {row.SumForOneTitle} &#x20bd;
                          </TableCellModal>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TypographyStyle>Итого: {totalSum} &#x20bd;</TypographyStyle>
              </Box>
            </div>
          </Modal>
        ))
      )}
    </div>
  );
}
