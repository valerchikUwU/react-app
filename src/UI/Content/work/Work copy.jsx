import React from "react";
import classes from "./Style.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Fade,
  Typography,
  Button,
} from "@mui/material";
import send from "./image/send.svg";
import done from "./image/done.svg";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import exit from "./image/exit.svg";
import cursor from "./image/cursor-click.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWork,
  getWorkModal,
  updateDraft,
  updateRecieved,
} from "../../../BLL/workSlice";
import { useParams } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Work() {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [dummyKey, setDummyKey] = useState(0); // Dummy state to force re-render
  useEffect(() => {
    dispatch(getWork(accountId));
  }, [accountId, dummyKey]);

  const [openStates, setOpenStates] = useState({});
  const handleOpenModal = (id) => setOpenStates({ ...openStates, [id]: true });
  const handleCloseModal = (id) =>
    setOpenStates({ ...openStates, [id]: false });

  useEffect(() => {
    // Find the first open modal
    const openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(getWorkModal({ accountId: accountId, orderId: openModalId }));
    }
  }, [openStates, dispatch]);

  const [isTextBlack, setIsTextBlack] = useState(false);
  const [isIconVisibleSend, setIsIconVisibleSend] = useState(true);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const handleIconClick = (orderId, organizationName) => {
    dispatch(
      updateDraft({
        accountId: accountId,
        orderId: orderId,
        organizationName: organizationName,
      })
    );
    setDummyKey((prevKey) => prevKey + 1);
    setIsTextBlack(true);
    setIsIconVisibleSend(false);
    setIsSelectDisabled(true);
  };

  const handleIconClickResieved = (orderId) => {
    dispatch(
      updateRecieved({
        accountId: accountId,
        orderId: orderId,
      })
    );
    setDummyKey((prevKey) => prevKey + 1);
  };

  const list = useSelector((state) => state.work?.work || []);
  const organizationList = useSelector((state) => state.work.organizationList);
  const listModalTitles = useSelector(
    (state) => state.work?.workModalTitles || []
  );
  const listModalOrder = useSelector(
    (state) => state.work?.workModalOrder || {}
  );
  const [selectedValue, setSelectedValue] = useState(""); // Инициализация с пустой строкой или значением по умолчанию

  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSave = () => {
    // Логика сохранения данных
    console.log("Данные сохранены");
  };

  const handleCancel = () => {
    // Логика отмены действий
    console.log("Действие отменено");
  };

  

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 90px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475 #FFFFFF",
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                №
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Академия
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Дата
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Сумма
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Состояние
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                № счета
              </TableCell>
              <TableCell
                className={classes.textHeader}
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Отметить
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((element) =>
              element.status == "Черновик" ? (
                <TableRow key={element.id}>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {element.orderNumber}
                  </TableCell>

                  <TableCell
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack ? classes.transitionText : ""
                    }`}
                  >
                    <FormControl variant="standard">
                      <Select
                        label="Организация"
                        sx={{ width: "100px" }}
                        value={selectedValue}
                        onChange={handleChangeSelect}
                        disabled={isSelectDisabled}
                      >
                        {element.organizationName}
                        
                        {organizationList.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {element.dispatchDate}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {element.SUM} &#x20bd;
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {isTextBlack ? "Активный" : element.status}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {element.billNumber}
                  </TableCell>

                  <TableCell
                    align="center"
                    className={`${
                      openStates[element.id] ? classes.modalRow : ""
                    }`}
                  >
                    {openStates[element.id] ? (
                      <img src={cursor} alt="курсор" />
                    ) : (
                      <Tooltip title="Заказать" arrow>
                        <Fade in={isIconVisibleSend}>
                          <IconButton
                            onClick={() =>
                              handleIconClick(element.id, selectedValue)
                            }
                          >
                            <img src={send} alt="отправить" />
                          </IconButton>
                        </Fade>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ) : element.status == "Отправлен" ? (
                <TableRow key={element.id} style={{ cursor: "pointer" }}>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    className={`${classes.textBody}  ${
                      openStates[element.id] ? classes.modalRow : ""
                    } `}
                  >
                    {element.orderNumber}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    className={`${classes.textBody}  ${
                      openStates[element.id] ? classes.modalRow : ""
                    }`}
                  >
                    {element.organizationName}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    className={`${classes.textBody}  ${
                      openStates[element.id] ? classes.modalRow : ""
                    } `}
                  >
                    {element.dispatchDate}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    className={`${classes.textBody}  ${
                      openStates[element.id] ? classes.modalRow : ""
                    }`}
                  >
                    {element.SUM} &#x20bd;
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    className={`${classes.textBody}  ${
                      openStates[element.id] ? classes.modalRow : ""
                    }`}
                  >
                    {element.status}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    className={`${classes.textBody}  ${
                      openStates[element.id] ? classes.modalRow : ""
                    }`}
                  >
                    {element.billNumber}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Отметить полученным" arrow>
                      <IconButton
                        onClick={() => handleIconClickResieved(element.id)}
                      >
                        <img src={done} alt="done" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow
                  key={element.id}
                  onClick={() => handleOpenModal(element.id)}
                  style={{ cursor: "pointer" }}
                  className={`${
                    openStates[element.id] ? classes.modalRow : ""
                  }`}
                >
                  <TableCell className={`${classes.textBody} `}>
                    {element.orderNumber}
                  </TableCell>
                  <TableCell className={`${classes.textBody} `}>
                    {element.organizationName}
                  </TableCell>
                  <TableCell className={`${classes.textBody} `}>
                    {element.dispatchDate}
                  </TableCell>
                  <TableCell className={`${classes.textBody} `}>
                    {element.SUM} &#x20bd;
                  </TableCell>
                  <TableCell className={`${classes.textBody} `}>
                    {element.status}
                  </TableCell>
                  <TableCell className={`${classes.textBody}`}>
                    {element.billNumber}
                  </TableCell>
                  <TableCell align="center">
                    {openStates[element.id] && (
                      <img src={cursor} alt="курсор" />
                    )}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {list.map((element) => (
        <Modal open={openStates[element.id] || false}>
          <div className={classes.location}>
            <IconButton
              onClick={() => handleCloseModal(element.id)}
              className={classes.modalIcon}
            >
              <img src={exit} alt="закрыть" />
            </IconButton>

            <Box className={classes.modalWindow}>
              <TableContainer
                component={Paper}
                sx={{
                  height: "calc(100vh - 150px)",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#005475 #FFFFFF",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Курс
                      </TableCell>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Доступ
                      </TableCell>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Поколение
                      </TableCell>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Доп. буклет
                      </TableCell>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Количество
                      </TableCell>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Цена
                      </TableCell>
                      <TableCell
                        className={classes.textHeader}
                        sx={{
                          paddingY: 1,
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          background: "#fff",
                        }}
                      >
                        Сумма
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listModalTitles.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className={classes.ModaltextBody}>
                          {row.product.abbreviation}
                        </TableCell>
                        <TableCell className={classes.ModaltextBody}>
                          {row.accessType}
                        </TableCell>
                        <TableCell className={classes.ModaltextBody}>
                          {row.generation}
                        </TableCell>
                        <TableCell className={classes.ModaltextBody}>
                          {row.addBooklet}
                        </TableCell>
                        <TableCell className={classes.ModaltextBody}>
                          {row.quantity}
                        </TableCell>
                        <TableCell className={classes.ModaltextBody}>
                          {row.PriceForOneProduct} &#x20bd;
                        </TableCell>
                        <TableCell className={classes.ModaltextBody}>
                          {row.SumForOneTitle} &#x20bd;
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography
                variant="h6"
                component="h2"
                className={classes.typography}
              >
                Итого: {listModalOrder.SUM} &#x20bd;
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // Плавное выравнивание кнопок справа
                  marginTop: "60px", 
                  marginRight: "10px", 
                  gap: "15px", 
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#005475",
                    color: "#FFFFFF",
                    fontFamily: 'Montserrat',
                    fontSize:'14px',
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#00435d",
                    },
                  }}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#CCCCCC",
                    color: "#000000",
                    fontSize:'14px',
                    fontWeight: 600,
                    fontFamily: 'Montserrat',
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
    </Box>
  );
}
