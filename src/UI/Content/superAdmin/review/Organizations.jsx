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

export default function Organizations({ openStates, close }) {
  const [data, setData] = useState(0);
  const [status, setStatus] = useState("Активный");
  const [payee, setPayee] = useState();
  const [products, setProducts] = useState();
  const [groupProducts, setGroupProducts] = useState();
  const [display, setDisplay] = useState();
  const [result, setResult] = useState(0);
  const [disabledGroupProducts, setDisabledGroupProducts] = useState(false);
  const [disabledProducts, setDisabledProducts] = useState(false);

  const allOrders = useSelector((state) => state.superAdminReview?.allOrders);
  const allProducts = useSelector(
    (state) => state.superAdminReview?.allProducts
  );
  const allPayees = useSelector((state) => state.superAdminReview?.allPayees);

  const nameOrganization = useSelector(
    (state) => state.superAdminReview?.nameOrganization
  );

  const id = useSelector((state) => state.superAdminReview?.id);
  const onChangeData = (e) => {
    setData(e.target.value);
  };

  const handleChangeSelectStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeSelectPayee = (event) => {
    setPayee(event.target.value);
  };

  const handleChangeSelectDisplay = (event) => {
    setDisplay(event.target.value);
  };

  const handleChangeSelectProducts = (event) => {
    setProducts(event.target.value);
  };

  const handleChangeSelectGroupProducts = (event) => {
    setGroupProducts(event.target.value);
  };

  const SUMOrder = () => {
    let sum = 0;
    allOrders?.map((item) => {
      if (item.orderStatus === status) {
        if (item.order.payeeId === payee) {
          sum += Number(item.SUM);
        }
      }
    });
    setResult(sum);
  };

  const totalQuantityOrder = () => {
    let totalQuantity = 0;
    allOrders?.map((item) => {
      if (item.orderStatus === status) {
        if (item.order.payeeId === payee) {
          totalQuantity += Number(item.totalQuantity);
        }
      }
    });
    setResult(totalQuantity);
  };

  const SUMProduct = () => {
    let sum = 0;
    allProducts?.map((item) => {
      if (groupProducts === "null") {
        if (item.id === products && item.titles[0]?.Order?.payeeId === payee) {
          sum += Number(item.SUM);
        }
      } else {
        if (
          item.productTypeId === groupProducts &&
          item.titles[0]?.Order?.payeeId === payee
        ) {
          sum += Number(item.SUM);
        }
      }
    });
    setResult(sum);
  };

  const totalQuantityProduct = () => {
    let totalQuantity = 0;
    allProducts?.map((item) => {
      if (groupProducts === "null") {
        if (item.id === products && item.titles[0]?.Order?.payeeId === payee) {
          totalQuantity += Number(item.totalQuantity);
        }
      } else {
        if (
          item.productTypeId === groupProducts &&
          item.titles[0]?.Order?.payeeId === payee
        ) {
          totalQuantity += Number(item.totalQuantity);
        }
      }
    });
    setResult(totalQuantity);
  };

  useEffect(() => {
    if (groupProducts === undefined) {
      setDisabledProducts(false);
    } else {
      if (groupProducts === "null") {
        setDisabledProducts(false);
      } else {
        setDisabledProducts(true);
      }
    }
  }, [groupProducts]);

  useEffect(() => {
    if (products === undefined) {
      setDisabledGroupProducts(false);
    } else {
      if (products === "null") {
        setDisabledGroupProducts(false);
      } else {
        setDisabledGroupProducts(true);
      }
    }
  }, [products]);

  useEffect(() => {
    setResult(0);
    if (data === 0) {
      if (display === "Сумма") {
        SUMOrder();
      } else {
        totalQuantityOrder();
      }
    } else {
      if (display === "Сумма") {
        SUMProduct();
      } else {
        totalQuantityProduct();
      }
    }
  }, [status, payee, products, groupProducts, display, data]);

  
  const resetState = () => {
    setData(0);
    setPayee();
    setProducts();
    setGroupProducts();
    setResult();
    setDisabledGroupProducts(false);
    setDisabledProducts(false);
    setDisplay();
  }

  return (
    <Modal open={openStates[id]} key={id}>
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
              close(id);
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

          <Box
            sx={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 600,
              color: "#005475",
              textAlign: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                alignSelf: "flex-end",
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 600,
                color: "#005475",
                borderBottom: "3px solid #005475",
              }}
            >
              Данные о:
            </Typography>
            <Select
              variant="standard"
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                color: "black",
                textAlign: "center",
                cursor: "pointer",
                width: "150px",
                height: "50px",
                marginLeft: "20px",
              }}
              value={data}
              onChange={(e) => {
                onChangeData(e);
              }}
            >
              <MenuItem
                value={0}
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  color: "#999999",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Заказы
              </MenuItem>
              <MenuItem
                value={1}
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  color: "#999999",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Товары
              </MenuItem>
            </Select>
          </Box>

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
            {data === 0 ? (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TextHeader>Академия</TextHeader>

                    <TextHeader>Статус</TextHeader>

                    <TextHeader>Получатель</TextHeader>

                    <TextHeader>Отобразить</TextHeader>

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
                    {nameOrganization}
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
                        value="Активный"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Активный
                      </MenuItem>
                      <MenuItem
                        value="Выставлен счёт"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Выставлен счёт
                      </MenuItem>
                      <MenuItem
                        value="Оплачен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Оплачен
                      </MenuItem>
                      <MenuItem
                        value="Отправлен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Отправлен
                      </MenuItem>
                      <MenuItem
                        value="Получен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Получен
                      </MenuItem>
                      <MenuItem
                        value="Отменен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Отменен
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
                    <Select
                      variant="standard"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                      value={payee}
                      onChange={(event) => handleChangeSelectPayee(event)}
                    >
                      {allPayees?.map((item) => {
                        return (
                          <MenuItem
                            value={item.id}
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                      value={display}
                      onChange={(event) => handleChangeSelectDisplay(event)}
                    >
                      <MenuItem
                        value="Сумма"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => SUMOrder()}
                      >
                        Сумма
                      </MenuItem>

                      <MenuItem
                        value="Количество"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => totalQuantityOrder()}
                      >
                        Количество
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
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TextHeader>Академия</TextHeader>

                    <TextHeader>Получатель</TextHeader>

                    <TextHeader>Группа товаров</TextHeader>

                    <TextHeader>Товары</TextHeader>

                    <TextHeader>Отобразить</TextHeader>

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
                    {nameOrganization}
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
                      value={payee}
                      onChange={(event) => handleChangeSelectPayee(event)}
                    >
                      {allPayees?.map((item) => {
                        return (
                          <MenuItem
                            value={item.id}
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                      value={groupProducts}
                      onChange={(event) =>
                        handleChangeSelectGroupProducts(event)
                      }
                      disabled={disabledGroupProducts}
                    >
                      <MenuItem
                        value={"null"}
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        —
                      </MenuItem>

                      <MenuItem
                        value={1}
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Начальные
                      </MenuItem>

                      <MenuItem
                        value={2}
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Основные
                      </MenuItem>
                      <MenuItem
                        value={3}
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Для персонала
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
                    <Select
                      variant="standard"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                      value={products}
                      onChange={(event) => handleChangeSelectProducts(event)}
                      disabled={disabledProducts}
                    >
                      <MenuItem
                        value={"null"}
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        —
                      </MenuItem>

                      {allProducts?.map((item) => {
                        return (
                          <MenuItem
                            value={item.id}
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            {item.abbreviation}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                      value={display}
                      onChange={(event) => handleChangeSelectDisplay(event)}
                    >
                      <MenuItem
                        value="Сумма"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => SUMProduct()}
                      >
                        Сумма
                      </MenuItem>

                      <MenuItem
                        value="Количество"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => totalQuantityProduct()}
                      >
                        Количество
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
            )}
          </TableContainer>
        </Box>
      </div>
    </Modal>
  );
}
