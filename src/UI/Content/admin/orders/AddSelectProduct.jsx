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
} from "@mui/material";
import React from "react";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import CustomStyledCheckbox from "../../styledComponents/CustomStyledCheckbox";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function AddSelectProduct({
  isOpenModalUpdate,
  setIsOpenModalUpdate,
  allProducts,
  selectProducts,
  exitAddSelectProduct,
  resetAddSelectProduct,

  deleteTitles,
  stateDeleteTitles,
  updateProductDelete,
}) {
  const [check, setCheck] = useState({});
  const [active, setActive] = useState(false);
  const [activeDeposit, setActiveDeposit] = useState(false);

  useEffect(() => {
    const hasChecked = Object.values(check).some((value) => {
      return (
        value.checked &&
        (value.type === 1 || value.type === 2 || value.type === 3)
      );
    });
    if (hasChecked) {
      console.log("hasChecked true");
      setActive(false);
      setActiveDeposit(true);
    } else {
      console.log("hasChecked false");
      setActiveDeposit(false);
    }

    const hasDepositChecked = Object.values(check).some(
      (value) => value.checked && value.type === 4
    );
    if (hasDepositChecked) {
      console.log("hasDepositChecked true");
      setActive(true);
      setActiveDeposit(false);
    } else {
      console.log("hasDepositChecked false");
      setActive(false);
    }
  }, [check]);


   // Функция для фильтрации объекта check
   const filterCheck = () => {
    const filteredCheck = Object.keys(check).reduce((acc, key) => {
      // Проверяем, есть ли id текущего ключа среди id объектов в массиве updateProductDelete
      const shouldRemove = updateProductDelete.some(item => item.id === check[key].id);

      // Если id не найден в массиве updateProductDelete, добавляем его в аккумулятор
      if (!shouldRemove) {
        acc[key] = check[key];
      }

      return acc;
    }, {});

    return filteredCheck;
  };

  useEffect(() => {
    if (exitAddSelectProduct === true) {
      setCheck({});
      resetAddSelectProduct();
    }
  }, [exitAddSelectProduct]);

  useEffect(() => {
    if (deleteTitles === true) {
      console.log('updateProductDelete');
      console.log(updateProductDelete);
      console.log('check');
      console.log(check);
      
     setCheck(filterCheck());
      stateDeleteTitles();
    }
  }, [deleteTitles]);

  const handleChangeCheckbox = (event, id, type) => {
    setCheck((prevState) => ({
      ...prevState,
      [id]: { checked: event.target.checked, type: type },
    }));
  };

  const resetStates = () => {
    // const newCheckState = Object.keys(check).reduce((acc, key) => {
    //   acc[key] = { checked: false, type: check[key].type }; // Преобразование строки в число
    //   return acc;
    // }, {});
    // setCheck(newCheckState);
    selectProducts(0);
    setCheck({});
  };

  const handleSave = () => {
    const checkedProducts = allProducts.filter(
      (product) => !!check[product.id] && check[product.id].checked
    );
    selectProducts(checkedProducts);
    setIsOpenModalUpdate(false);
  };

  return (
    <Modal open={isOpenModalUpdate}>
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
            onClick={() => setIsOpenModalUpdate(false)}
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
              maxHeight: "60vh",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#005475 #FFFFFF",

              "&::-webkit-scrollbar": {
                width: "10px", // Ширина скроллбара
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px", // Радиус скругления трека скроллбара
                backgroundColor: "#f1f1f1", // Цвет трека
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px", // Радиус скругления области управления
                backgroundColor: "#888", // Цвет области управления
                ":hover": {
                  backgroundColor: "#555", // Цвет при наведении
                },
              },
            }}
          >
            <Table stickyHeader sx={{ display: "flex", flexDirection: "row" }}>
              <div>
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
                      Начальные
                    </TextHeader>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 1) {
                      return (
                        <TableRow>
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 1)
                              }
                              disabled={active}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </div>

              <div>
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
                      Основные
                    </TextHeader>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 2) {
                      return (
                        <TableRow>
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 2)
                              }
                              disabled={active}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </div>

              <div>
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
                      Для персонала
                    </TextHeader>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 3) {
                      return (
                        <TableRow>
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 3)
                              }
                              disabled={active}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </div>

              <div>
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
                      Депозит
                    </TextHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 4) {
                      return (
                        <TableRow>
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 4)
                              }
                              disabled={activeDeposit}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </div>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Плавное выравнивание кнопок справа
              marginTop: "30px",
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
              Сбросить
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}
