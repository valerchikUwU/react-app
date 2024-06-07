import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState,useRef } from "react";
import exit from "./image/exit.svg";
import cursor from "./image/cursor-click.svg";
import deleteBlue from "./image/deleteBlue.svg";
import deleteGrey from "./image/deleteGrey.svg";
import check from "./image/check.svg";
import checkbox from "./image/checkbox.svg";
import plus from "./image/plus.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { deleteTitleOrder } from "../../../../BLL/workSlice.js";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Add from "./Add.jsx";
import CustomStyledCheckbox from "../../styledComponents/CustomStyledCheckbox.jsx";

import { styled } from "@mui/system";
import {
  getNewOrder,
  getOrder,
  getOrderModal,
  updateTitleOrderAdmin,
} from "../../../../BLL/admin/orderSlice.js";
import FloatingScrollToTopButton from "../../styledComponents/FloatingScrollToTopButton.jsx";


export default function Orders() {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [openStates, setOpenStates] = useState({});
  const [selectedAbbr, setSelectedAbbr] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [selectedInput, setSelectedInput] = useState({});
  const [isFieldCleared, setIsFieldCleared] = useState({});
  const [sumForOneTitle, setSumForOneTitle] = useState({});
  const [selectedCheck, setSelectedCheck] = useState({});
  const [selectedAccessType, setSelectedAccessType] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productId, setProductId] = useState({});
  const [isDeleteClicked, setIsDeleteClicked] = useState(false); // при удалении товара в модальном окне заново вызывался getOrderModal
  const [isOpen, setIsOpen] = useState(false);
  const [selectOrganization, setSelectOrganization] = useState({});
  const [selectStatus, setSelectStatus] = useState({});
  const [payeeName, setPayeeName] = useState({});
  const [inputAccountNumber, setInputAccountNumber] = useState({});
  const [isInputCleared, setIsInputCleared] = useState();

  const orders = useSelector((state) => state.adminOrder.orders);

  const ListProductsModal = useSelector((state) => state.adminOrder?.products);
  const listModalTitles = useSelector((state) => state.adminOrder?.modalTitles);
  const ObjectModalOrder = useSelector((state) => state.adminOrder?.modalOrder);
  const listModalPayees = useSelector((state) => state.adminOrder?.payees);

  const allProducts = useSelector((state) => state.adminOrder?.allProducts);
  const allOrganizations = useSelector((state) => state.adminOrder?.allOrganizations);
  const allPayees = useSelector((state) => state.adminOrder?.allPayees);

  const allIds = listModalTitles.map((row) => row.id);
  const totalSum = allIds.reduce(
    (acc, id) => acc + (sumForOneTitle[id] || 0),
    0
  );

  useEffect(() => {
    dispatch(getOrder(accountId));
  }, [accountId]);

  useEffect(() => {
    // Find the first open modal
    const openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(getOrderModal({ accountId: accountId, orderId: openModalId }));
      setIsDeleteClicked(false);
    }
  }, [isDeleteClicked, openStates, dispatch]);

  useEffect(() => {
    if (listModalTitles) {
      const initialSelectedInput = listModalTitles.reduce((acc, item) => {
        acc[item.id] = item.quantity; // Предполагаем, что у вас есть начальное количество
        return acc;
      }, {});

      setSelectedInput(initialSelectedInput);
    }
  }, [listModalTitles]); // Зависимость от listModalTitles

  useEffect(() => {
    // Принудительное обновление состояния чекбокса
    listModalTitles.forEach((row) => {
      // Проверяем, есть ли уже значение в selectedCheck для данного id
      if (
        selectedCheck[row.id] === undefined ||
        selectedCheck[row.id] === null
      ) {
        // Если нет, проверяем, равно ли значение в row.addBooklet true
        if (row.addBooklet === true) {
          // Если да, устанавливаем selectedCheck[row.id] в true
          setSelectedCheck((prevState) => ({
            ...prevState,
            [row.id]: true, // Используйте true для отмеченных чекбоксов
          }));
        } else {
          // Если row.addBooklet не равно true, устанавливаем selectedCheck[row.id] в false
          setSelectedCheck((prevState) => ({
            ...prevState,
            [row.id]: false, // Используйте false для неотмеченных чекбоксов
          }));
        }
      }
    });
  }, [selectedCheck, listModalTitles]); // Зависимости хука

  useEffect(() => {
    // Обновляем ошибки для каждого элемента
    const newErrors = {};
    listModalTitles.forEach((row) => {
      const isChecked = selectedCheck[row.id];
      const isSelectEmpty = !selectedAccessType[row.id];
      const isSelectEmpty1 = !row.accessType;

      if (!isChecked && isSelectEmpty && isSelectEmpty1) {
        newErrors[row.id] = "Заполните"; // Сообщение об ошибке
      } else {
        // Удаляем ошибку, если условия не выполняются
        newErrors[row.id] = null;
      }
    });
    setErrors(newErrors);
  }, [selectedCheck, selectedAccessType, listModalTitles]);

  useEffect(() => {
    // Инициализация sumForOneTitle
    const initialSumForOneTitle = listModalTitles.reduce((acc, row) => {
      const price = selectedCheck[row.id]
        ? selectedProduct[row.id]?.PriceDefinition?.priceBooklet ||
          row.price.priceBooklet
        : selectedProduct[row.id]?.PriceDefinition?.priceAccess ||
          row.price.priceAccess;
      acc[row.id] = parseFloat(selectedInput[row.id] || 0) * price;
      return acc;
    }, {});

    setSumForOneTitle(initialSumForOneTitle);
  }, [selectedCheck, selectedInput, listModalTitles, selectedProduct]);

  const OpenModal = (id) => setOpenStates({ ...openStates, [id]: true });

  const handleCloseModal = (id) => {
    setOpenStates({ ...openStates, [id]: false });
    setIsInputCleared(false);
  };

  const handleDeleteOrder = (orderId, titleId) => {
    dispatch(
      deleteTitleOrder({
        accountId: accountId,
        orderId: orderId,
        titleId: titleId,
      })
    ).then(() => {
      // После успешного выполнения deleteTitleOrder вызываем getWork
      dispatch(getOrder(accountId)); // для обновления полей когда еще пользователь находится в модальном окне на самой странице уже меняется
      setIsDeleteClicked(true);
    });
  };

  // Функция для обработки изменения значения в Select
  const handleChangeSelectAbbr = (event, id) => {
    setSelectedAbbr((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeGeneration = (event, id) => {
    setSelectedGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeInput = (e, id, price) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") {
      setSelectedInput((prevState) => ({
        ...prevState,
        [id]: undefined,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setSelectedInput((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: false,
      }));

      // // Вычисляем новую сумму и обновляем SumForOneTitle
      // const newSum = parseFloat(newValue) * price;
      // setSumForOneTitle((prevSums) => ({
      //   ...prevSums,
      //   [id]: newSum,
      // }));
    }
  };

  const handleCheckboxChange = (event, id) => {
    setSelectedCheck((prevState) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };

  const handleChangeAccessType = (event, id) => {
    setSelectedAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleSave = () => {
    // Проверяем, есть ли хотя бы одна ошибка в массиве errors
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors) {
      // Создаем пустой массив для titlesToUpdate
      const titlesToUpdate = [];

      // Проходим по listModalTitles и проверяем условия для каждого элемента
      listModalTitles.forEach((row) => {
        // Проверяем, существует ли значение для данного id в selectedCheck
        console.log("------------------------------------------");
        console.log(row.productId);
        console.log("------------------------------------------");
        titlesToUpdate.push({
          id: row.id,
          productId: productId[row.id] ? productId[row.id] : row.productId,
          accessType: selectedCheck[row.id] 
          ? null
           : (selectedAccessType[row.id]? selectedAccessType[row.id] : row.accessType),       
          generation: selectedGeneration[row.id]
            ? selectedGeneration[row.id]
            : row.generation,
          quantity: selectedInput[row.id],
          addBooklet: selectedCheck[row.id],
        });
      });

      // Теперь titlesToUpdate - это массив объектов, который можно использовать в вашем запросе
      // Проверяем, что titlesToUpdate не пуст, перед тем как вызывать dispatch
      if (titlesToUpdate.length > 0) {
        // Предполагается, что updateTitleOrder возвращает промис
        console.log(selectOrganization[ObjectModalOrder.id]);
        console.log(ObjectModalOrder.organizationName);
        dispatch(
          updateTitleOrderAdmin({
            accountId: accountId,
            orderId: ObjectModalOrder.id,
            organizationName: selectOrganization[ObjectModalOrder.id]
              ? selectOrganization[ObjectModalOrder.id]
              : ObjectModalOrder.organizationName,
            status: selectStatus[ObjectModalOrder.id]
              ? selectStatus[ObjectModalOrder.id]
              : ObjectModalOrder.status,
            billNumber: inputAccountNumber[ObjectModalOrder.id]
              ? inputAccountNumber[ObjectModalOrder.id]
              : ObjectModalOrder.billNumber,
            payeeId: ObjectModalOrder.payeeId,
            titlesToUpdate: titlesToUpdate, // titlesToUpdate теперь является массивом объектов
          })
        ).then(() => {
          dispatch(getOrder(accountId)); // для обновления Суммы и Состояния моментально при нажатии на кнопку сохранить в модальном окне
        });
      } else {
        // Выводим сообщение или выполняем другую логику, если titlesToUpdate пуст
        console.log("Нет элементов для сохранения");
      }
    } else {
      // Если есть хотя бы одна ошибка, выводим сообщение или выполняем другую логику
      console.log("Есть ошибки, сохранение не производится");
    }
  };

  // Функция для сброса состояний
  const resetStates = () => {
    // Сброс selectedAbbr
    const initialSelectedAbbr = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.abbr;
      return acc;
    }, {});

    setSelectedAbbr(initialSelectedAbbr);

    // Сброс selectedCheck
    const initialSelectedCheck = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.addBooklet;
      return acc;
    }, {});

    setSelectedCheck(initialSelectedCheck);

    // Сброс selectedAccessType
    const initialSelectedAccessType = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.accessType;
      return acc;
    }, {});

    setSelectedAccessType(initialSelectedAccessType);

    // Сброс selectedGeneration
    const initialSelectedGeneration = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.generation;
      return acc;
    }, {});

    setSelectedGeneration(initialSelectedGeneration);

    // Сброс selectedInput
    const initialSelectedInput = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.quantity;
      return acc;
    }, {});

    setSelectedInput(initialSelectedInput);

    //Первая таблица
    setSelectOrganization(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.organizationName, // Обновляем выбранное значение для данного элемента
      }),
      {}
    );
    setPayeeName(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.payeeName, // Обновляем выбранное значение для данного элемента
      }),
      {}
    );
    setSelectStatus(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.status, // Обновляем выбранное значение для данного элемента
      }),
      {}
    );
    setInputAccountNumber(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.billNumber, // Обновляем выбранное значение для данного элемента
      }),
      {}
    );
  };

  const handleChangeSelectOrganization = (event, id) => {
    setSelectOrganization(() => ({
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeSelectStatus = (event, id) => {
    setSelectStatus(() => ({
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };
  const handleChangePayeeName = (event, id) => {
    setPayeeName(() => ({
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeInputAccountNumber = (event, id) => {
    if (event.target.value === "") {
      setIsInputCleared(true);
    } else {
      setIsInputCleared(false);
    }

    setInputAccountNumber(() => ({
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeModalAdd = () => {
    dispatch(getNewOrder(accountId));
    setIsOpen(true);
  };
  // Text Header
  const TextHeader = styled(TableCell)({
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    color: "#005475",
    borderBottom: "3px solid #005475",
    textAlign: "center",
  });

  const TableCellModal = styled(TableCell)({
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    color: "#333333",
    textAlign: "center",
  });

  // Typography
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

  const [boxSize, setBoxSize] = useState({ height: 'auto', width: 'auto' }); // Храним размеры <Box>
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setBoxSize({ height: rect.height, width: rect.width });
    }
  }, []);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 90px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475 #FFFFFF",

          "&::-webkit-scrollbar": {
            width: "10px", // Ширина скроллбара
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "100px", // Радиус скругления трека скроллбара
            backgroundColor: "#f1f1f1", // Цвет трека
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "100px", // Радиус скругления области управления
            backgroundColor: "#888", // Цвет области управления
            ":hover": {
              backgroundColor: "#555", // Цвет при наведении
            },
          },
        }}
      >
        <Table stickyHeader aria-label="simple table">
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
                Заказчик
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
                Сумма
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
                Кол-во
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
                № счета
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
                <IconButton onClick={() => handleChangeModalAdd()}>
                  <img src={plus} alt="плюс" />
                </IconButton>
              </TextHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                onClick={() => OpenModal(order.id)}
                sx={{
                  backgroundColor: openStates[order.id] ? "#0031B01A" : "",
                  cursor: "pointer",
                }}
              >
                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.orderNumber}
                </TableCell>
                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.fullName}
                </TableCell>
                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.organizationName}
                </TableCell>
                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.dispatchDate}
                </TableCell>
                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.SUM}&#x20bd;
                </TableCell>
                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.totalQuantity}
                </TableCell>

                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.status}
                </TableCell>

                <TableCell
                  onClick={() => OpenModal(order.id)}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {order.billNumber}
                </TableCell>

                <TableCell align="center" onClick={() => OpenModal(order.id)}>
                  {openStates[order.id] && <img src={cursor} alt="курсор" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FloatingScrollToTopButton showOnPageScroll={true} />
      </TableContainer>

      {orders.map((element) => (
        <Modal open={openStates[element.id] || false}>
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
              onClick={() => handleCloseModal(element.id)}
              sx={{
                gridArea: "icon",
                position: "absolute", // Изменено на абсолютное позиционирование
                marginLeft: `${boxSize.width}px`,
              }}
            >
              <img src={exit} alt="закрыть" />
            </IconButton>

            <Box
               ref={boxRef}
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
                    </TableRow>
                  </TableHead>

                  {element.status === "Активный" ||
                  element.status === "Выставлен счёт" ? (
                    <TableBody>
                      <TableRow key={ObjectModalOrder.id}>
                        <TableCell sx={{ textAlign: "center" }}>
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
                              selectOrganization[ObjectModalOrder.id] ||
                              ObjectModalOrder.organizationName
                            }
                            onChange={(event) =>
                              handleChangeSelectOrganization(
                                event,
                                ObjectModalOrder.id
                              )
                            }
                          >
                            {ObjectModalOrder.organizationList?.map(
                              (organization) => (
                                <MenuItem
                                  key={organization}
                                  value={organization}
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#999999",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  {organization}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </TableCell>

                        <TableCell sx={{ textAlign: "center" }}>
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
                              payeeName[ObjectModalOrder.id] ||
                              ObjectModalOrder.payeeName
                            }
                            onChange={(event) =>
                              handleChangePayeeName(event, ObjectModalOrder.id)
                            }
                          >
                            {listModalPayees.map((payee) => (
                              <MenuItem
                                key={payee.id}
                                value={payee.name}
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#999999",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                {payee.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>

                        <TableCell sx={{ textAlign: "center" }}>
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
                              selectStatus[ObjectModalOrder.id] ||
                              ObjectModalOrder.status
                            }
                            onChange={(event) =>
                              handleChangeSelectStatus(
                                event,
                                ObjectModalOrder.id
                              )
                            }
                          >
                            <MenuItem
                              value="Активный"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#999999",
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
                                fontWeight: 600,
                                color: "#999999",
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
                                fontWeight: 600,
                                color: "#999999",
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
                                fontWeight: 600,
                                color: "#999999",
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
                                fontWeight: 600,
                                color: "#999999",
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
                                fontWeight: 600,
                                color: "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              Отменен
                            </MenuItem>
                          </Select>
                        </TableCell>

                        <TableCell sx={{ textAlign: "center" }}>
                          <TextField
                            variant="standard"
                            sx={{
                              width: "80px",
                            }}
                            value={
                              inputAccountNumber[ObjectModalOrder.id] ||
                              (isInputCleared
                                ? ""
                                : ObjectModalOrder.billNumber)
                            }
                            onChange={(event) =>
                              handleChangeInputAccountNumber(
                                event,
                                ObjectModalOrder.id
                              )
                            }
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "black",
                            textAlign: "center",
                          }}
                        >
                          <CustomStyledCheckbox></CustomStyledCheckbox>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
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
                  )}
                </Table>
              </TableContainer>

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
                      {element.status === "Активный" ||
                      element.status === "Выставлен счёт" ? (
                        <TextHeader
                          sx={{
                            paddingY: 1,
                            position: "sticky",

                            zIndex: 100,
                            background: "#fff",
                          }}
                        >
                          <img src={deleteBlue} alt="удалить" />
                        </TextHeader>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  </TableHead>

                  {element.status === "Активный" ||
                  element.status === "Выставлен счёт" ? (
                    <TableBody>
                      {listModalTitles.map((row) => (
                        <TableRow key={row.id}>
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
                                width: "70px",
                              }}
                              value={
                                selectedAbbr[row.id] || row.product.abbreviation
                              }
                              onChange={(event) => {
                                const newSelectedAbbr = event.target.value;
                                const product = ListProductsModal.find(
                                  (p) => p.abbreviation === newSelectedAbbr
                                );

                                setSelectedProduct((prevState) => ({
                                  ...prevState,
                                  [row.id]: product,
                                }));

                                handleChangeSelectAbbr(event, row.id);

                                setProductId((prevState) => ({
                                  ...prevState,
                                  [row.id]: product.id, // Обновляем выбранное значение для данного элемента
                                }));
                              }}
                            >
                              {ListProductsModal.map((product) => (
                                <MenuItem
                                  key={product.id}
                                  value={product.abbreviation}
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#999999",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  {product.abbreviation}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>

                          <TableCell>
                            {selectedCheck[row.id] ? (
                              <FormControl error={!!errors[row.id]} fullWidth>
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
                                    selectedCheck[row.id] ? null : (selectedAccessType[row.id] || row.accessType)
                                  }
                                  onChange={(e) =>
                                    handleChangeAccessType(e, row.id)
                                  }
                                  disabled={selectedCheck[row.id] || false} // Добавляем условие для отключения
                                  displayEmpty
                                  renderValue={(selected) =>
                                    selected === null ? null : selected
                                  }
                                >
                                  <MenuItem value={null} disabled></MenuItem>
                                </Select>
                                <FormHelperText error>
                                  {errors[row.id]}
                                </FormHelperText>
                              </FormControl>
                            ) : (
                              <FormControl error={!!errors[row.id]} fullWidth>
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
                                    selectedAccessType[row.id] || row.accessType
                                  }
                                  onChange={(e) =>
                                    handleChangeAccessType(e, row.id)
                                  }
                                  disabled={selectedCheck[row.id] || false} // Добавляем условие для отключения
                                  displayEmpty
                                  renderValue={(selected) =>
                                    selected === null ? null : selected
                                  }
                                >
                                  <MenuItem value={null} disabled></MenuItem>

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
                                <FormHelperText error>
                                  {errors[row.id]}
                                </FormHelperText>
                              </FormControl>
                            )}
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
                                selectedGeneration[row.id] || row.generation
                              }
                              onChange={(e) =>
                                handleChangeGeneration(e, row.id)
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

                          <TableCell sx={{ textAlign: "center" }}>
                            <CustomStyledCheckbox
                              sx={{ textAlign: "center" }}
                              checked={selectedCheck[row.id] || false} // Используйте false для неотмеченных чекбоксов
                              onChange={(event) =>
                                handleCheckboxChange(event, row.id)
                              }
                              size={1}
                            ></CustomStyledCheckbox>
                          </TableCell>

                          <TableCell>
                            <TextField
                              variant="standard"
                              sx={{
                                width: "80px",
                              }}
                              value={
                                selectedInput[row.id] ||
                                (isFieldCleared[row.id] ? "" : row.quantity)
                              }
                              onChange={(e) =>
                                handleChangeInput(
                                  e,
                                  row.id,
                                  selectedCheck[row.id]
                                    ? selectedProduct[row.id]?.PriceDefinition
                                        ?.priceBooklet || row.price.priceBooklet
                                    : selectedProduct[row.id]?.PriceDefinition
                                        ?.priceAccess || row.price.priceAccess
                                )
                              }
                            />
                          </TableCell>

                          <TableCellModal>
                            {selectedCheck[row.id]
                              ? selectedProduct[row.id]?.PriceDefinition
                                  ?.priceBooklet || row.price.priceBooklet
                              : selectedProduct[row.id]?.PriceDefinition
                                  ?.priceAccess || row.price.priceAccess}
                            &#x20bd;
                          </TableCellModal>

                          <TableCellModal>
                            {sumForOneTitle[row.id]} &#x20bd;
                          </TableCellModal>

                          <TableCellModal>
                            <IconButton
                              onClick={() =>
                                handleDeleteOrder(
                                  element.id,
                                  row.id,
                                  selectedProduct[row.id]?.id,
                                  row.product.abbreviation
                                )
                              }
                            >
                              <img src={deleteGrey} alt="удалить" />
                            </IconButton>
                          </TableCellModal>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
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
                  )}
                </Table>
              </TableContainer>

              <TypographyStyle>Итого: {totalSum} &#x20bd;</TypographyStyle>
              {element.status === "Активный" ||
              element.status === "Выставлен счёт" ? (
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
              ) : (
                ""
              )}
            </Box>
          </div>
        </Modal>
      ))}
        
      <Add isOpen={isOpen} setIsOpen={setIsOpen} allPayees={allPayees} allOrganizations={allOrganizations}  allProducts={allProducts} ></Add>
    </Box>
  );
}
