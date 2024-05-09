import React from "react";
import classes from "./Work.module.css";
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
import { useEffect } from "react";
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
import CustomStyledCheckbox from "./CustomStyledCheckbox";
import { updateSaveButtonState } from "../../../BLL/productSlice";

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

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const handleDeleteOrder = (orderId, titleId, productId, productId1) => {
    if (productId1) {
      const newSelectedAbbr = productId1; 
      const product = productsModal.find(p => p.abbreviation === newSelectedAbbr);
      console.log(product);
      setSelectedProduct(product); 
      dispatch(updateSaveButtonState({ productId: product.id, active: false }));
      localStorage.removeItem(`saveButtonActive-${product.id}`)
    } 
    if(productId){
      console.log(productId);
      dispatch(updateSaveButtonState({ productId, active: false }));
      localStorage.removeItem(`saveButtonActive-${productId}`)
    }
    dispatch(
      deleteTitleOrder({
        accountId: accountId,
        orderId: orderId,
        titleId: titleId,
      })
    );
    setIsDeleteClicked(true);
  };
  useEffect(() => {
    // Find the first open modal
    const openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(getWorkModal({ accountId: accountId, orderId: openModalId }));
      setIsDeleteClicked(false);
    }
  }, [isDeleteClicked, openStates, dispatch]);

  const [isTextBlack, setIsTextBlack] = useState({});
  const [isIconVisibleSend, setIsIconVisibleSend] = useState({});
  const [isSelectDisabled, setIsSelectDisabled] = useState({});

  const handleIconClick = (orderId, organizationName) => {
    dispatch(
      updateDraft({
        accountId: accountId,
        orderId: orderId,
        organizationName: organizationName,
      })
    );
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

  const list = useSelector((state) => state.work?.work || []);
  const organizationList = useSelector((state) => state.work.organizationList);
  const productsModal = useSelector((state) => state.work.products);
  const listModalTitles = useSelector(
    (state) => state.work?.workModalTitles || []
  );
  const listModalOrder = useSelector(
    (state) => state.work?.workModalOrder || {}
  );

  const [selectedValues, setSelectedValues] = useState({});

  const handleChangeSelect = (e, id) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  const [selectedAbbr, setSelectedAbbr] = useState({});

  // Функция для обработки изменения значения в Select
  const handleChangeSelectAbbr = (event, id) => {
    setSelectedAbbr((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const [selectedGeneration, setSelectedGeneration] = useState("");

  const handleChangeGeneration = (event, id) => {
    setSelectedGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const [selectedInput, setSelectedInput] = useState({});

  useEffect(() => {
    if (listModalTitles) {
      const initialSelectedInput = listModalTitles.reduce((acc, item) => {
        acc[item.id] = item.quantity; // Предполагаем, что у вас есть начальное количество
        return acc;
      }, {});

      setSelectedInput(initialSelectedInput);
    }
  }, [listModalTitles]); // Зависимость от listModalTitles

  const [isFieldCleared, setIsFieldCleared] = useState({});
  const [sumForOneTitle, setSumForOneTitle] = useState({});

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

      // Вычисляем новую сумму и обновляем SumForOneTitle
      const newSum = parseFloat(newValue) * price;
      setSumForOneTitle((prevSums) => ({
        ...prevSums,
        [id]: newSum,
      }));
    }
  };

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

  const [selectedCheck, setSelectedCheck] = useState({});
  const handleCheckboxChange = (event, id) => {
    setSelectedCheck((prevState) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };

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

  const [selectedAccessType, setSelectedAccessType] = useState({});

  const [savedSelectedAccessType, setSavedSelectedAccessType] = useState({});
  useEffect(() => {
    setSavedSelectedAccessType(selectedAccessType);
  }, [selectedAccessType]);

  useEffect(() => {
    // Сбрасываем значения selectedAccessType для элементов, когда чекбокс становится false
    Object.keys(selectedCheck).forEach((id) => {
      if (!selectedCheck[id]) {
        setSelectedAccessType((prevValues) => ({
          ...prevValues,
          [id]: savedSelectedAccessType[id] || null, // Восстанавливаем значение из savedSelectedAccessType
        }));
      }
    });
  }, [selectedCheck, savedSelectedAccessType]); // Зависимость от selectedCheck и savedSelectedAccessType

  const [errors, setErrors] = useState({});

  const handleChangeAccessType = (event, id) => {
    setSelectedAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

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
        ? row.price.priceBooklet
        : row.price.priceAccess;
      acc[row.id] = parseFloat(selectedInput[row.id] || 0) * price;
      return acc;
    }, {});

    setSumForOneTitle(initialSumForOneTitle);
  }, [selectedCheck, selectedInput, listModalTitles]);

  const allIds = listModalTitles.map((row) => row.id);
  const totalSum = allIds.reduce(
    (acc, id) => acc + (sumForOneTitle[id] || 0),
    0
  );

  const [productId, setProductId] = useState({});

  const handleSave = () => {
    // Проверяем, есть ли хотя бы одна ошибка в массиве errors
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors) {
      // Создаем пустой массив для titlesToUpdate
      const titlesToUpdate = [];

      // Проходим по listModalTitles и проверяем условия для каждого элемента
      listModalTitles.forEach((row) => {
        // Проверяем, существует ли значение для данного id в selectedCheck
        console.log('------------------------------------------');
        console.log(row.productId);
        console.log('------------------------------------------');
        titlesToUpdate.push({
          id: row.id,
          productId: productId[row.id] ? productId[row.id] : row.productId,
          accessType: selectedAccessType[row.id]
            ? selectedAccessType[row.id]
            : row.accessType,
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
        dispatch(
          updateTitleOrder({
            accountId: accountId,
            orderId: listModalOrder.id,
            titlesToUpdate: titlesToUpdate, // titlesToUpdate теперь является массивом объектов
          })
        );
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
  };

  const [selectedProduct, setSelectedProduct] = useState({});


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
            {sortedList.map((element) =>
              element.status === "Черновик" ||
              element.status === "Черновик депозита" ? (
                <TableRow key={element.id}>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack[element.id] ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                    
                  >
                    {element.orderNumber}
                  </TableCell>

                  <TableCell
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack[element.id] ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    <FormControl variant="standard">
                      <Select
                     className={`${classes.textBodyDraft} ${
                      isTextBlack[element.id] ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                        label="Организация"
                        sx={{ width: "100px" }}
                        value={
                          selectedValues[element.id] || element.organizationName
                        }
                        onChange={(e) => handleChangeSelect(e, element.id)}
                        disabled={isSelectDisabled[element.id]}
                      >
                        {organizationList.map((item) => (
                          <MenuItem key={item} value={item} className={classes.textBodyDraft}>
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
                      isTextBlack[element.id] ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {element.formattedDispatchDate}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack[element.id] ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {element.SUM} &#x20bd;
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack[element.id] ? classes.transitionText : ""
                    } ${openStates[element.id] ? classes.modalRow : ""}`}
                  >
                    {isTextBlack[element.id] ? "Активный" : element.status}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenModal(element.id)}
                    style={{ cursor: "pointer" }}
                    className={`${classes.textBodyDraft} ${
                      isTextBlack[element.id] ? classes.transitionText : ""
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
                        <Fade in={!isIconVisibleSend[element.id]}>
                          <IconButton
                            onClick={() =>
                              handleIconClick(
                                element.id,
                                selectedValues[element.id] || element.organizationName
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
                    {element.formattedDispatchDate}
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
                    {element.formattedDispatchDate}
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
                  maxHeight: 'calc(100vh - 200px)',
                  overflow: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#005475 #FFFFFF",
                }}
              >
                <Table stickyHeader>
                  {element.status === "Черновик" ? (
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
                          <TableCell
                            className={classes.textHeader}
                            sx={{
                              paddingY: 1,
                              position: "sticky",

                              zIndex: 100,
                              background: "#fff",
                            }}
                          >
                            <img src={deleteBlue} alt="удалить" />
                          </TableCell>
                      </TableRow>
                    </TableHead>
                  ) : element.status === "Черновик депозита" ? (
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
                          <TableCell
                            className={classes.textHeader}
                            sx={{
                              paddingY: 1,
                              position: "sticky",
                              zIndex: 100,
                              background: "#fff",
                            }}
                          >
                            <img src={deleteBlue} alt="удалить" />
                          </TableCell>
                      </TableRow>
                    </TableHead>
                  ) :(
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
                  )}

                  {element.status === "Черновик" ? (
                    <TableBody>
                      {listModalTitles.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className={classes.ModaltextBody}>
                            <Select
                            className={classes.ModaltextBody}
                              variant="standard"
                              sx={{ width: "100px" }}
                              value={selectedAbbr[row.id] || row.product.abbreviation}
                              // onChange={(event) =>
                              //   handleChangeSelectAbbr(event, row.id)
                              // }

                              onChange={(event) => {
                                const newSelectedAbbr = event.target.value;
                                const product = productsModal.find(p => p.abbreviation === newSelectedAbbr);
                                
                                setSelectedProduct(product); // Установите выбранный продукт
                                
                                handleChangeSelectAbbr(event, row.id);


                                setProductId((prevState) => ({
                                  ...prevState,
                                  [row.id]: product.id, // Обновляем выбранное значение для данного элемента
                                }));

                                // Если вам нужно получить product.id, вы можете сделать это здесь
                                // setProductId(product.id);
                                console.log(product.id); // Выводит ID выбранного продукта в консоль
                              }}  
                                
                            >
                             
                              {productsModal.map((product) => (
                                 
                                <MenuItem className={classes.textBodyDraft}
                                  key={product.id}
                                  value={product.abbreviation}
                                >
                                  {product.abbreviation}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
                            {selectedCheck[row.id] ? (
                              <FormControl error={!!errors[row.id]} fullWidth>
                                <Select
                                 className={classes.ModaltextBody}
                                  variant="standard"
                                  sx={{ width: "100px" }}
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
                                </Select>
                                <FormHelperText error className={classes.ModaltextBody}>
                                  {errors[row.id]}
                                </FormHelperText>
                              </FormControl>
                            ) : (
                              <FormControl error={!!errors[row.id]}  fullWidth>
                                <Select
                                 className={classes.ModaltextBody}
                                  variant="standard"
                                  sx={{ width: "100px" }}
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

                                  <MenuItem value="Электронный" className={classes.textBodyDraft}>
                                    Электронный
                                  </MenuItem>
                                  <MenuItem value="Бумажный" className={classes.textBodyDraft}>Бумажный</MenuItem>
                                </Select>
                                <FormHelperText error className={classes.ModaltextBody}>
                                  {errors[row.id]}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
                            <Select
                            className={classes.ModaltextBody}
                              variant="standard"
                              sx={{ width: "100px" }}
                              value={
                                selectedGeneration[row.id] || row.generation
                              }
                              onChange={(e) =>
                                handleChangeGeneration(e, row.id)
                              }
                            >
                              <MenuItem value="Первое поколение" className={classes.textBodyDraft}>
                                Первое поколение
                              </MenuItem>
                              <MenuItem value="Второе поколение" className={classes.textBodyDraft}>
                                Второе поколение
                              </MenuItem>
                            </Select>
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
                            {/* <Checkbox
                              checked={selectedCheck[row.id] || false} // Используйте false для неотмеченных чекбоксов
                              onChange={(event) =>
                                handleCheckboxChange(event, row.id)
                              }
                            /> */}

                            <CustomStyledCheckbox
                              checked={selectedCheck[row.id] || false} // Используйте false для неотмеченных чекбоксов
                              onChange={(event) =>
                                handleCheckboxChange(event, row.id)
                              }
                              size={1}
                            ></CustomStyledCheckbox>
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
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

                          <TableCell className={classes.ModaltextBody}>
                            {selectedCheck[row.id]
                              ? row.price.priceBooklet
                              : row.price.priceAccess}
                            &#x20bd;
                          </TableCell>
{/* 
<TableCell className={classes.ModaltextBody}>
  {selectedCheck[row.id]? (
    selectedProduct[row.id] && selectedProduct[row.id].priceBooklet
     ? selectedProduct[row.id].priceBooklet
      : row.price.priceBooklet
  ) : (
    selectedProduct[row.id] && selectedProduct[row.id].priceAccess
     ? selectedProduct[row.id].priceAccess
      : row.price.priceAccess
  )}
  &#x20bd;
</TableCell> */}


                          <TableCell className={classes.ModaltextBody}>
                            {sumForOneTitle[row.id]} &#x20bd;
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
                            <IconButton
                              onClick={() =>
                                handleDeleteOrder(element.id, row.id, selectedProduct.id, row.product.abbreviation) 
                              }
                            >
                              <img src={deleteGrey} alt="удалить" />
                            </IconButton>
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : element.status === "Черновик депозита" ? (
                    <TableBody>
                      {listModalTitles.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className={classes.ModaltextBody}>
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

                          <TableCell className={classes.ModaltextBody}>
                            {selectedCheck[row.id]
                              ? row.price.priceBooklet
                              : row.price.priceAccess}
                            &#x20bd;
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
                            {sumForOneTitle[row.id]} &#x20bd;
                          </TableCell>

                          <TableCell className={classes.ModaltextBody}>
                            <IconButton
                              onClick={() =>
                                handleDeleteOrder(element.id, row.id) //уточнить
                              }
                            >
                              <img src={deleteGrey} alt="удалить" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
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
                  )}
                </Table>
              </TableContainer>

              <Typography
                variant="h6"
                component="h2"
                className={classes.typography}
              >
                Итого: {totalSum} &#x20bd;
              </Typography>

              {element.status === "Черновик" && (
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
                    variant="outlined"
                    onClick={resetStates}
                    sx={{
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
                    variant="outlined"
                    onClick={resetStates}
                    sx={{
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
      ))}
    </Box>
  );
}
