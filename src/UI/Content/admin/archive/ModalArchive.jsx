import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";


import { getOrderModal } from "../../../../BLL/admin/orderSlice.js";
import CircularProgressCustom from "../../styledComponents/CircularProgress.jsx";

import exit from "./image/exit.svg";
import check from "./image/check.svg";
import checkbox from "./image/checkbox.svg";

// Для даты
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // импортируем русскую локаль
import { ruRU } from "@mui/x-date-pickers/locales";

// Устанавливаем русскую локаль для dayjs
dayjs.locale("ru");

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
  // Добавляем класс hoverEffect для применения стилей при наведении
  "&.hoverEffect": {
    transition: "background-color 0.3s ease",
  },
  "&.hoverEffect:hover": {
    backgroundColor: "#47bcd6", // Более темный оттенок #005475
  },
});

const TableCellModal = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  textAlign: "center",
});

// Typography
const TypographyStyle = styled(Typography)({
  fontFamily: "'Montserrat'",
  fontSize: "16px",
  fontWeight: 700,
  float: "right",
  marginTop: "15px",
  marginRight: "15px",
  marginBottom: "15px",
});

export default function ModalArchive({ accountId, modalIdOrder, setModalIdOrder }) {
  const dispatch = useDispatch();
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [openModal, setOpenModal] = useState(true);

  const listModalTitles = useSelector((state) => state.adminOrder?.modalTitles);
  const modalOrder = useSelector((state) => state.adminOrder?.modalOrder);

  useEffect(() => {
    if (modalIdOrder) {
      dispatch(
        getOrderModal({ accountId: accountId, orderId: modalIdOrder })
      ).then(
        () => {
          setIsLoadingModal(false);
        },
        () => {
          setIsLoadingModal(false);
        }
      );
    }
  }, [modalIdOrder, dispatch]);

  return (
    <>
      {isLoadingModal ? (
        <Modal open={true}>
          <CircularProgressCustom></CircularProgressCustom>
        </Modal>
      ) : (
        <Modal open={openModal}>
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
            >
              <IconButton
                onClick={() => {
                  setOpenModal(false)
                  setModalIdOrder(null);
                }}
                sx={{
                  position: "absolute",
                  float: "right",
                  top: "-38px",
                  right: "-40px",
                }}
              >
                <img src={exit} alt="закрыть" />
              </IconButton>

              <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
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
                        Академия
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
                        Получатель
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
                        Состояние
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
                        № Счета
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
                        С депозита
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
                        Дата
                      </TextHeader>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow key={modalOrder.id}>
                      <TableCellModal>
                        {modalOrder.organizationName}
                      </TableCellModal>
                      <TableCellModal>
                        {modalOrder.payeeName}
                      </TableCellModal>
                      <TableCellModal>{modalOrder.status}</TableCellModal>
                      <TableCellModal>
                        {modalOrder.billNumber}
                      </TableCellModal>
                      <TableCellModal>
                        {modalOrder.isFromDeposit ? (
                          <img src={check} alt="галка" />
                        ) : (
                          <img
                            src={checkbox}
                            alt="галка"
                            style={{ opacity: "0.6" }}
                          />
                        )}
                      </TableCellModal>
                      <TableCellModal>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="ru" // русский для адаптера
                        >
                          <DatePicker
                            disabled
                            size="small"
                            value={dayjs(modalOrder?.dispatchDate)}
                            format="DD.MM.YYYY"
                          />
                        </LocalizationProvider>
                      </TableCellModal>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {listModalTitles[0]?.product.abbreviation == "Д" ? (
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: "calc(100vh - 350px)",
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
              ) : (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      maxHeight: "calc(100vh - 350px)",
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
                </>
              )}

              <TypographyStyle>
                Итого: {modalOrder?.SUM} &#x20bd;
              </TypographyStyle>
            </Box>
          </div>
        </Modal>
      )}
    </>
  );
}
