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
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import CustomStyledCheckbox from "../../styledComponents/CustomStyledCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import add from "./image/add.svg";
import del from "./image/delete.svg";
import { createProducts } from "../../../../BLL/superAdmin/comissionSlice";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});
export default function ModalRules({ openStates, close, commision }) {
  const dispatch = useDispatch();
  const handleSave = () => {};
  const resetStates = () => {};
  const [groupProducts, setGroupProducts] = useState({});
  const [products, setProducts] = useState({});
  const [selectedAccessType, setSelectedAccessType] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState({});
  const [accrual, setAccrual] = useState({});

  const [isFieldCleared, setIsFieldCleared] = useState({});

  const rules = useSelector((state) => state.superAdminCommision?.rules || []);

  const newRules = useSelector(
    (state) => state.superAdminCommision?.newRules || []
  );

  const addProducts = () => {
    dispatch(
      createProducts({
        groupProducts: null,
        products: null,
        generation: null,
        accessType: null,
        accrual: null,
      })
    );
  };

  const handleChangeGroupProducts = (event, id) => {
    setGroupProducts((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };
  const handleChangeProducts = (event, id) => {
    setProducts((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };
  const handleChangeAccrual = (e, id) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") {
      setAccrual((prevState) => ({
        ...prevState,
        [id]: undefined, // Обновляем выбранное значение для данного элемента
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setAccrual((prevState) => ({
        ...prevState,
        [id]: newValue, // Обновляем выбранное значение для данного элемента
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const handleChangeGeneration = (event, id) => {
    setSelectedGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeAccessType = (event, id) => {
    setSelectedAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  return (
    <div>
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
            <IconButton
              onClick={() => close(element.id)}
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
              <TableContainer component={Paper}>
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
                        №
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
                        Группа товаров
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
                        Товары
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
                        Поколения
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
                        Начисление
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
                        <IconButton onClick={addProducts()}>
                          <img src={add} alt="плюс" />
                        </IconButton>
                      </TextHeader>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rules?.map((element, index) => (
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
                          {" "}
                          {++index}
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
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "black",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              groupProducts[element.id] || element.productTypeId
                            }
                            onChange={(e) =>
                              handleChangeGroupProducts(e, element.id)
                            }
                          >
                            <MenuItem
                              value="1"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Начальные
                            </MenuItem>
                            <MenuItem
                              value="2"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Основные
                            </MenuItem>
                            <MenuItem
                              value="3"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Дя персонала
                            </MenuItem>
                          </Select>
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
                          {element.productId}
                        </TableCell>

                        <TableCell>
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "black",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "200px",
                            }}
                            value={
                              selectedGeneration[element.id] ||
                              element.generation
                            }
                            onChange={(e) =>
                              handleChangeGeneration(e, element.id)
                            }
                          >
                            <MenuItem
                              value="Первое поколение"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Первое поколение
                            </MenuItem>
                            <MenuItem
                              value="Второе поколение"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Второе поколение
                            </MenuItem>
                          </Select>
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
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "black",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              selectedAccessType[element.id] ||
                              element.accessType
                            }
                            onChange={(e) =>
                              handleChangeAccessType(e, element.id)
                            }
                          >
                            <MenuItem
                              value="Электронный"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Электронный
                            </MenuItem>
                            <MenuItem
                              value="Бумажный"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Бумажный
                            </MenuItem>
                          </Select>
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
                              width: "80px",
                            }}
                            value={
                              accrual[element.id] ||
                              (isFieldCleared[element.id]
                                ? ""
                                : element.commision)
                            }
                            onChange={(e) => handleChangeAccrual(e, element.id)}
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          <IconButton>
                            <img src={del} alt="удалить" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableBody>
                    {newRules?.map((element, index) => (
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
                          {" "}
                          {++index}
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
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "black",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              groupProducts[element.id] || element.productTypeId
                            }
                            onChange={(e) =>
                              handleChangeGroupProducts(e, element.id)
                            }
                          >
                            <MenuItem
                              value="1"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Начальные
                            </MenuItem>
                            <MenuItem
                              value="2"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Основные
                            </MenuItem>
                            <MenuItem
                              value="3"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Дя персонала
                            </MenuItem>
                          </Select>
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
                          {element.productId}
                        </TableCell>

                        <TableCell>
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "black",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "200px",
                            }}
                            value={
                              selectedGeneration[element.id] ||
                              element.generation
                            }
                            onChange={(e) =>
                              handleChangeGeneration(e, element.id)
                            }
                          >
                            <MenuItem
                              value="Первое поколение"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Первое поколение
                            </MenuItem>
                            <MenuItem
                              value="Второе поколение"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Второе поколение
                            </MenuItem>
                          </Select>
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
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "black",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              selectedAccessType[element.id] ||
                              element.accessType
                            }
                            onChange={(e) =>
                              handleChangeAccessType(e, element.id)
                            }
                          >
                            <MenuItem
                              value="Электронный"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Электронный
                            </MenuItem>
                            <MenuItem
                              value="Бумажный"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Бумажный
                            </MenuItem>
                          </Select>
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
                              width: "80px",
                            }}
                            value={
                              accrual[element.id] ||
                              (isFieldCleared[element.id]
                                ? ""
                                : element.commision)
                            }
                            onChange={(e) => handleChangeAccrual(e, element.id)}
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          <IconButton>
                            <img src={del} alt="удалить" />
                          </IconButton>
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
    </div>
  );
}
