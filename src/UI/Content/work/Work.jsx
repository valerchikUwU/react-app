import React from "react";
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
} from "@mui/material";
import send from "./image/send.svg";
import done from "./image/done.svg";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import exit from "./image/exit.svg";
import cursor from "./image/cursor-click.svg";

import classes from "./Work.module.css";

export default function Work() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isTextBlack, setIsTextBlack] = useState(false);
  const [isIconVisibleSend, setIsIconVisibleSend] = useState(true);

  const sum = () => {};

  const handleIconClick = () => {
    setIsTextBlack(true);
    setIsIconVisibleSend(false);
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          height: 'calc(100vh - 90px)',
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
            <TableRow>
              <TableCell
                className={`${classes.textBody} ${
                  isTextBlack ? classes.transitionText : ""
                }`}
              >
                24
              </TableCell>
              <TableCell
                className={`${classes.textBody} ${
                  isTextBlack ? classes.transitionText : ""
                }`}
              >
                Екатеринбург
              </TableCell>
              <TableCell
                className={`${classes.textBody} ${
                  isTextBlack ? classes.transitionText : ""
                }`}
              >
                20.08.23
              </TableCell>
              <TableCell
                className={`${classes.textBody} ${
                  isTextBlack ? classes.transitionText : ""
                }`}
              >
                29 000 &#x20bd;
              </TableCell>
              <TableCell
                className={`${classes.textBody} ${
                  isTextBlack ? classes.transitionText : ""
                }`}
              >
                {isTextBlack ? 'Активный' : 'Черновик'}
              </TableCell>
              <TableCell
                className={`${classes.textBody} ${
                  isTextBlack ? classes.transitionText : ""
                }`}
              >
                59
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Заказать" arrow>
                  <Fade in={isIconVisibleSend}>
                    <IconButton onClick={handleIconClick}>
                      <img src={send} alt="отправить" />
                    </IconButton>
                  </Fade>
                </Tooltip>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.textBody} style={{ color: "#333333" }}>14</TableCell>
              <TableCell className={classes.textBody} style={{ color: "#333333" }}>Екатеринбург</TableCell>
              <TableCell className={classes.textBody} style={{ color: "#333333" }}>02.08.23</TableCell>
              <TableCell className={classes.textBody} style={{ color: "#333333" }}>
                70 000 &#x20bd;
              </TableCell>
              <TableCell className={classes.textBody} style={{ color: "#333333" }}>Отправлен</TableCell>
              <TableCell className={classes.textBody} style={{ color: "#333333" }}>54</TableCell>
              <TableCell align="center">
                <Tooltip title="Отметить полученным" arrow>
                  <IconButton>
                    <img src={done} alt="галочка" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>

            <TableRow
              onClick={handleOpen}
              className={`${open ? classes.modalRow : ""}`}
            >
              <TableCell
                className={classes.textBody}
                style={{ color: "#333333" }}
              >
                19
              </TableCell>
              <TableCell
                className={classes.textBody}
                style={{ color: "#333333" }}
              >
                Уфа
              </TableCell>
              <TableCell
                className={classes.textBody}
                style={{ color: "#333333" }}
              >
                16.08.23
              </TableCell>
              <TableCell
                className={classes.textBody}
                style={{ color: "#333333" }}
              >
                34 000 &#x20bd;
              </TableCell>
              <TableCell
                className={classes.textBody}
                style={{ color: "#333333" }}
              >
                Оплачен
              </TableCell>
              <TableCell
                className={classes.textBody}
                style={{ color: "#333333" }}
              >
                58
              </TableCell>
              <TableCell align="center">
                {open && <img src={cursor} alt="курсор" />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open}>
        <div className={classes.location}>
          <IconButton onClick={handleClose} className={classes.modalIcon}>
            <img src={exit} alt="закрыть" />
          </IconButton>
          <Box className={classes.modalWindow}>
            <TableContainer
              component={Paper}
              sx={{
                height: 'calc(100vh - 150px)',
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
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ModaltextBody}>КОК</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      Бумажный
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>1</TableCell>
                    <TableCell className={classes.ModaltextBody}></TableCell>
                    <TableCell className={classes.ModaltextBody}>6</TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      3 500 &#x20bd;
                    </TableCell>
                    <TableCell className={classes.ModaltextBody}>
                      21 000 &#x20bd;
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography
              variant="h6"
              component="h2"
              className={classes.typography}
            >
              Итого: {`${sum()}`} &#x20bd;
            </Typography>
          </Box>
        </div>
      </Modal>
    </Box>
  );
}
