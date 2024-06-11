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
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { incrementDummyKey, postReciever } from "../../../../BLL/superAdmin/comissionSlice.js";
// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function AddReciever({ isOpen, close, commisionRecieverId }) {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [billNumber, setBillNumber] = useState();
  const [spisanie, setSpisanie] = useState();

  const changeBillNumber = (event) => {
    setBillNumber(event.target.value);
  };
  const changeSpisanie = (event) => {
    setSpisanie(event.target.value);
  };
  const resetStates = () => {
    setBillNumber("");
    setSpisanie("");
  };

  const handleSave = () => {
    console.log(billNumber);
    console.log(spisanie);
    dispatch(
      postReciever({
        accountId: accountId,
        commisionRecieverId: commisionRecieverId,
        billNumber: billNumber,
        Spisanie: spisanie,   
      })
    ).then(() => {
      dispatch(incrementDummyKey())
    });
  };

  return (
    <div>
      <Modal open={isOpen}>
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
          <IconButton
            onClick={() => close(false)}
            sx={{
              gridArea: "icon",
              position: "absolute", // Изменено на абсолютное позиционирование
              marginLeft: "900px",
            }}
          >
            <img src={exit} alt="закрыть" />
          </IconButton>

          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0 0 24px rgba(0, 0, 0, 0.5)",
              padding: "4px",
              borderRadius: "10px",
              gridArea: "box",
              alignSelf: "center",
              position: "relative",
              maxHeight: "calc(100vh - 200px)",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#005475 #FFFFFF",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{ marginTop: "40px", width: "400px" }}
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
                      Списание
                    </TextHeader>
                  </TableRow>
                </TableHead>

                <TableBody>
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
                      <TextField
                        variant="standard"
                        sx={{
                          width: "150px",
                        }}
                        value={billNumber}
                        onChange={changeBillNumber}
                      ></TextField>
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
                      <TextField
                        variant="standard"
                        sx={{
                          width: "150px",
                        }}
                        value={spisanie}
                        onChange={changeSpisanie}
                      ></TextField>
                    </TableCell>
                  </TableRow>
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
    </div>
  );
}
