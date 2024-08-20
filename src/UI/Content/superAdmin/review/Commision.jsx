import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";
import exit from "./exit.svg";

const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function Commision({ openStates, close }) {
  const commisionReceiver = useSelector(
    (state) => state.superAdminReview?.commisionReceiver
  );
  const operations = useSelector((state) => state.superAdminReview?.operations);
  const [status, setStatus] = useState();
  const [result, setResult] = useState(0);

  const handleChangeSelectStatus = (event) => {
    setStatus(event.target.value);
  };

  const changeResult = () => {
    let sum = 0;
    operations?.map((item) => {
      if (status === "Начислено") {
        sum += Number(item.Spisanie);
      } else {
        sum += Number(item.Postyplenie);
      }
    });
    setResult(sum);
  };

  useEffect(() => {changeResult()}, [status])

  const resetState = () => {
    setResult(0);
    setStatus();
  }

  return (
    <Modal open={openStates[commisionReceiver?.id]} key={commisionReceiver?.id}>
      <div
        style={{
          display: "grid",
          gridTemplateAreas: '"icon" "box"',
          gridGap: "10px",
          placeItems: "center",
          height: "auto",
          position: "absolute",
          top: "45%",
          left: "50%",
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
            scrollbarWidth: "thin",
            scrollbarColor: "#005475 #FFFFFF",
            overflow: "visible",
            maxWidth: "95%",
          }}
        >
          <IconButton
            onClick={() => {
              resetState();
              close(commisionReceiver?.id);
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

          <Typography
            sx={{
              width: "240px",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 600,
              color: "#005475",
              borderBottom: "3px solid #005475",
              marginTop: "10px",
            }}
          >
            Данные о: Комиссионных
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "calc(100vh - 350px)",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#005475 #FFFFFF",
              marginTop: "30px",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TextHeader>Получатель</TextHeader>

                  <TextHeader>Статус</TextHeader>

                  <TextHeader>Результат</TextHeader>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableCell
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {commisionReceiver?.name}
                </TableCell>

                <TableCell
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={status}
                    onChange={(event) => handleChangeSelectStatus(event)}
                  >
                    <MenuItem
                      value="Начислено"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => changeResult()}
                    >
                      Начислено
                    </MenuItem>

                    <MenuItem
                      value="Выплачено"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => changeResult()}
                    >
                      Выплачено
                    </MenuItem>
                  </Select>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {result}
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Modal>
  );
}
