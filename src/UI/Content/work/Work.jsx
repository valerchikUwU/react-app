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
  Fade,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import send from "./image/send.svg";
import done from "./image/done.svg";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import exit from "./image/exit.svg";
import cursor from "./image/cursor-click.svg";
import deleteBlue from "./image/deleteBlue.svg";
import deleteGrey from "./image/deleteGrey.svg";
import check from "./image/check.svg";
import checkbox from "./image/checkbox.svg";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import {
  deleteTitleOrder,
  getWork,
  getWorkModal,
  updateDraft,
  updateRecieved,
  updateTitleOrder,
} from "../../../BLL/workSlice";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CustomStyledCheckbox from "../styledComponents/CustomStyledCheckbox.jsx";
import { styled } from "@mui/system";
import classes from "./Work.module.css";
import {
  deletePress,
  deletePressArray,
  deletePressSend,
  deleteCountClick,
  decrementCountClick,
} from "../../../BLL/productSlice.js";
import CircularProgressCustom from "../styledComponents/CircularProgress.jsx";

export default function Work() {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [dummyKey, setDummyKey] = useState(0); // Dummy state to force re-render
  const [openStates, setOpenStates] = useState({});
  const [isTextBlack, setIsTextBlack] = useState({});
  const [isIconVisibleSend, setIsIconVisibleSend] = useState({});
  const [isSelectDisabled, setIsSelectDisabled] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
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
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const list = useSelector((state) => state.work?.work || []);
  const organizationList = useSelector((state) => state.work.organizationList);
  const productsModal = useSelector((state) => state.work.products);
  const listModalTitles = useSelector(
    (state) => state.work?.workModalTitles || []
  );
  const ObjectModalOrder = useSelector(
    (state) => state.work?.workModalOrder || {}
  );

  const allIds = listModalTitles.map((row) => row.id);
  const totalSum = allIds.reduce(
    (acc, id) => acc + (sumForOneTitle[id] || 0),
    0
  );

  // Функция сортировки
  function sortElementsByStatus(a, b) {
    if (a.status === "Черновик" && b.status !== "Черновик") {
      return -1;
    }
    if (a.status !== "Черновик" && b.status === "Черновик") {
      return 1;
    }

    if (a.status === "Черновик депозита" && b.status !== "Черновик депозита") {
      return -1;
    }
    if (a.status !== "Черновик депозита" && b.status === "Черновик депозита") {
      return 1;
    }

    return 0;
  }

  const sortedList = [...list].sort(sortElementsByStatus);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getWork(accountId)).then(() => {
      setIsLoading(false);
    });
  }, [accountId, dummyKey]);

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
  }, [selectedProduct, selectedCheck, selectedAccessType, listModalTitles]);

  useEffect(() => {
    // Инициализация sumForOneTitle

    const initialSumForOneTitle = listModalTitles.reduce((acc, row) => {
      const price = selectedCheck[row.id]
        ? selectedProduct[row.id]?.priceBooklet || row.price.priceBooklet
        : selectedProduct[row.id]?.priceAccess || row.price.priceAccess;
      acc[row.id] = parseFloat(selectedInput[row.id] || 0) * price;
      return acc;
    }, {});

    setSumForOneTitle(initialSumForOneTitle);
  }, [
    selectedProduct,
    productId,
    selectedCheck,
    selectedInput,
    listModalTitles,
  ]);

  const OpenModal = (id) => {
    setIsLoadingModal(true);
    setOpenStates({ ...openStates, [id]: true });
  };

  const handleCloseModal = (id) =>
    setOpenStates({ ...openStates, [id]: false });

  const handleDeleteOrder = (orderId, titleId, productId) => {
    dispatch(
      deleteTitleOrder({
        accountId: accountId,
        orderId: orderId,
        titleId: titleId,
      })
    ).then(() => {
      dispatch(deletePress({ id: productId }));
      dispatch(decrementCountClick());
      console.log("productId");
      console.log(productId);
      // После успешного выполнения deleteTitleOrder вызываем getWork
      dispatch(getWork(accountId)); // для обновления полей когда еще пользователь находится в модальном окне на самой странице уже меняется
      setIsDeleteClicked(true);
    });
  };

  const handleIconClick = (orderId, organizationName) => {
    dispatch(
      updateDraft({
        accountId: accountId,
        orderId: orderId,
        organizationName: organizationName,
      })
    ).then(() => {
      dispatch(getWork(accountId));
      dispatch(deletePressSend());
      dispatch(deleteCountClick());
    });
    setDummyKey((prevKey) => prevKey + 1);
    setIsIconVisibleSend((prevState) => ({
      ...prevState,
      [orderId]: true,
    }));

    setIsTextBlack((prevState) => ({
      ...prevState,
      [orderId]: true,
    }));
    setIsSelectDisabled((prevState) => ({
      ...prevState,
      [orderId]: true,
    }));
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

  const handleChangeSelect = (e, id) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
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
      const changeProduct = [];

      // Проходим по listModalTitles и проверяем условия для каждого элемента
      listModalTitles.forEach((row) => {
        titlesToUpdate.push({
          id: row.id,
          productId: productId[row.id] ? productId[row.id] : row.productId,
          accessType: selectedCheck[row.id]
            ? null
            : selectedAccessType[row.id]
            ? selectedAccessType[row.id]
            : row.accessType,
          generation: selectedGeneration[row.id]
            ? selectedGeneration[row.id]
            : row.generation,
          quantity: selectedInput[row.id],
          addBooklet: selectedCheck[row.id],
        });

        changeProduct.push({
          id: productId[row.id] ? productId[row.id] : row.productId,
        });
      });

      // Теперь titlesToUpdate - это массив объектов, который можно использовать в вашем запросе
      // Проверяем, что titlesToUpdate не пуст, перед тем как вызывать dispatch
      if (titlesToUpdate.length > 0) {
        dispatch(deletePressArray(changeProduct));
        // Предполагается, что updateTitleOrder возвращает промис
        dispatch(
          updateTitleOrder({
            accountId: accountId,
            orderId: ObjectModalOrder.id,
            titlesToUpdate: titlesToUpdate, // titlesToUpdate теперь является массивом объектов
          })
        ).then(() => {
          // После успешного выполнения updateTitleOrder вызываем getWork
          dispatch(getWork(accountId));
          handleCloseModal(ObjectModalOrder.id)
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

  const handleSaveDeposit = () => {
    // Создаем пустой массив для titlesToUpdate
    const titlesToUpdate = [];

    // Проходим по listModalTitles и проверяем условия для каждого элемента
    listModalTitles.forEach((row) => {
      titlesToUpdate.push({
        id: row.id,
        productId: productId[row.id] ? productId[row.id] : row.productId,
        accessType: null,
        generation: null,
        quantity: selectedInput[row.id],
        addBooklet: false,
      });
    });

    // Теперь titlesToUpdate - это массив объектов, который можно использовать в вашем запросе
    // Проверяем, что titlesToUpdate не пуст, перед тем как вызывать dispatch
    if (titlesToUpdate.length > 0) {
      // Предполагается, что updateTitleOrder возвращает промис
      dispatch(
        updateTitleOrder({
          accountId: accountId,
          orderId: ObjectModalOrder.id,
          titlesToUpdate: titlesToUpdate, // titlesToUpdate теперь является массивом объектов
        })
      ).then(() => {
        // После успешного выполнения updateTitleOrder вызываем getWork
        dispatch(getWork(accountId));
        handleCloseModal(ObjectModalOrder.id)
      });
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

  const [modal, setModal] = useState(false);


  return (
    <Box>
      {isLoading ? (
        <CircularProgressCustom value={"55%"}></CircularProgressCustom>
      ) : (
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
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
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
                  Отметить
                </TextHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedList.map((element) =>
                element.status === "Черновик" ||
                element.status === "Черновик депозита" ? (
                  <TableRow key={element.id}>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: isTextBlack[element.id] ? "black" : "#999999",
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
                      sx={{
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                        textAlign: "center",
                      }}
                    >
                      <FormControl variant="standard">
                        <Select
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: isTextBlack[element.id]
                              ? "black"
                              : "#999999",
                          }}
                          label="Организация"
                          value={
                            selectedValues[element.id] ||
                            element.organizationName
                          }
                          onChange={(e) => handleChangeSelect(e, element.id)}
                          disabled={isSelectDisabled[element.id]}
                        >
                          {organizationList.map((item) => (
                            <MenuItem
                              key={item}
                              value={item}
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: isTextBlack[element.id]
                                  ? "black"
                                  : "#999999",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: isTextBlack[element.id] ? "black" : "#999999",
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
                        fontWeight: 600,
                        color: isTextBlack[element.id] ? "black" : "#999999",
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
                        fontWeight: 600,
                        color: isTextBlack[element.id] ? "black" : "#999999",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "transparent",
                        transition: "color 0.5s ease",
                      }}
                    >
                      {isTextBlack[element.id] ? "Активный" : element.status}
                    </TableCell>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: isTextBlack[element.id] ? "black" : "#999999",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "transparent",
                        transition: "color 0.5s ease",
                      }}
                    >
                      {element.billNumber}
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                        textAlign: "center",
                      }}
                    >
                      {openStates[element.id] ? (
                        <img src={cursor} alt="курсор" />
                      ) : (
                        <Tooltip title="Заказать" arrow>
                          <Fade in={!isIconVisibleSend[element.id]}>
                            <IconButton
                              onClick={() =>
                                handleIconClick(
                                  element.id,
                                  selectedValues[element.id] ||
                                    element.organizationName
                                )
                              }
                            >
                              <img src={send} alt="отправить" />
                            </IconButton>
                          </Fade>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ) : element.status === "Отправлен" ? (
                  <TableRow key={element.id} style={{ cursor: "pointer" }}>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                      }}
                      onClick={() => OpenModal(element.id)}
                    >
                      {element.orderNumber}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                      }}
                      onClick={() => OpenModal(element.id)}
                    >
                      {element.organizationName}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                      }}
                      onClick={() => OpenModal(element.id)}
                    >
                      {element.formattedDispatchDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                      }}
                      onClick={() => OpenModal(element.id)}
                    >
                      {element.SUM} &#x20bd;
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                      }}
                      onClick={() => OpenModal(element.id)}
                    >
                      {element.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                      }}
                      onClick={() => OpenModal(element.id)}
                    >
                      {element.billNumber}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: openStates[element.id]
                          ? "#0031B01A"
                          : "",
                        textAlign: "center",
                      }}
                    >
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
                    onClick={() => OpenModal(element.id)}
                    sx={{
                      backgroundColor: openStates[element.id]
                        ? "#0031B01A"
                        : "",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {element.orderNumber}
                    </TableCell>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {element.organizationName}
                    </TableCell>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {element.formattedDispatchDate}
                    </TableCell>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {element.SUM} &#x20bd;
                    </TableCell>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {element.status}
                    </TableCell>
                    <TableCell
                      onClick={() => OpenModal(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
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
      )}
      
      {isLoadingModal ? (
        <Modal open={true}>
          <CircularProgress
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
                    {element.status === "Черновик" ? (
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
                        </TableRow>
                      </TableHead>
                    ) : element.status === "Черновик депозита" ? (
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
                        </TableRow>
                      </TableHead>
                    ) : (
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
                    )}

                    {element.status === "Черновик" ? (
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
                                  selectedAbbr[row.id] ||
                                  row.product.abbreviation
                                }
                                onChange={(event) => {
                                  const newSelectedAbbr = event.target.value;
                                  const product = productsModal.find(
                                    (p) => p.abbreviation == newSelectedAbbr
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
                                {productsModal.map((product) => (
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
                                      selectedCheck[row.id]
                                        ? null
                                        : selectedAccessType[row.id] ||
                                          row.accessType
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
                                      selectedAccessType[row.id] ||
                                      row.accessType
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
                                      ? selectedProduct[row.id]?.priceBooklet ||
                                          row.price.priceBooklet
                                      : selectedProduct[row.id]?.priceAccess ||
                                          row.price.priceAccess
                                  )
                                }
                              />
                            </TableCell>

                            <TableCellModal>
                              {selectedCheck[row.id]
                                ? selectedProduct[row.id]?.priceBooklet ||
                                  row.price.priceBooklet
                                : selectedProduct[row.id]?.priceAccess ||
                                  row.price.priceAccess}
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
                                    productId[element.id] || row.productId
                                  )
                                }
                              >
                                <img src={deleteGrey} alt="удалить" />
                              </IconButton>
                            </TableCellModal>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : element.status === "Черновик депозита" ? (
                      <TableBody>
                        {listModalTitles.map((row) => (
                          <TableRow key={row.id}>
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
                                sx={{ width: "70px" }}
                                variant="standard"
                                value={
                                  selectedInput[row.id] ||
                                  (isFieldCleared[row.id] ? "" : row.quantity)
                                }
                                onChange={(e) =>
                                  handleChangeInput(
                                    e,
                                    row.id,
                                    selectedCheck[row.id]
                                      ? row.price.priceBooklet
                                      : row.price.priceAccess
                                  )
                                }
                              />
                            </TableCell>

                            <TableCellModal>
                              {selectedCheck[row.id]
                                ? row.price.priceBooklet
                                : row.price.priceAccess}
                              &#x20bd;
                            </TableCellModal>

                            <TableCellModal>
                              {sumForOneTitle[row.id]} &#x20bd;
                            </TableCellModal>

                            <TableCellModal>
                              <IconButton
                                onClick={
                                  () => handleDeleteOrder(element.id, row.id) //уточнить
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

                {element.status === "Черновик" && (
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
                        variant: "outlined",
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
                )}

                {element.status === "Черновик депозита" && (
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
                      onClick={handleSaveDeposit}
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
                        variant: "outlined",
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
                )}
              </Box>
            </div>
          </Modal>
        ))
      )}
    </Box>
  );
}