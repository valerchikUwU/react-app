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
  Divider,
  Chip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState, useRef } from "react";
import exit from "./image/exit.svg";
import cursor from "./image/cursor-click.svg";
import deleteBlue from "./image/deleteBlue.svg";
import deleteGrey from "./image/deleteGrey.svg";
import check from "./image/check.svg";
import checkbox from "./image/checkbox.svg";
import plus from "./image/plus.svg";
import { useEffect, useLayoutEffect } from "react";
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
import CircularProgressCustom from "../../styledComponents/CircularProgress.jsx";
import AddSelectProduct from "./AddSelectProduct.jsx";
import AddTitlesOrders from "./AddTitlesOrders.jsx";

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
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [selectOrganization, setSelectOrganization] = useState({});
  const [selectStatus, setSelectStatus] = useState({});
  const [payeeName, setPayeeName] = useState({});
  const [inputAccountNumber, setInputAccountNumber] = useState({});
  const [isInputCleared, setIsInputCleared] = useState();
  const [selectedCheckDeposit, setSelectedCheckDeposit] = useState();
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // AddTitlesOrders.jsx
  const [checkProductBooklet, setcheckProductBooklet] = useState({});
  const [selectProductGeneration, setSelectProductGeneration] = useState({});
  const [selectProductAccessType, setSelectProductAccessType] = useState({});
  const [productInputQuantity, setProductInputQuantity] = useState({});
  const [isFieldClearedProduct, setIsFieldClearedProduct] = useState({});
  const [sumForOneProduct, setSumForOneProduct] = useState({});

  const [exitAddSelectProduct, setExitAddSelectProduct] = useState(false);
  const [deleteTitles, setDeleteTitles] = useState(false);

  const [products, setProducts] = useState([]);
  const handleChangeModalProduct = (selectProducts) => {
    setProducts(selectProducts);
  };
  const allIdsProduct =
    Array.isArray(products) && products.map((row) => row.id);
  const totalSumProduct =
    Array.isArray(products) &&
    allIdsProduct.reduce((acc, id) => acc + (sumForOneProduct[id] || 0), 0);

  useEffect(() => {
    // Инициализация sumForOneTitle
    const initialSumForOneTitle =
      Array.isArray(products) &&
      products.reduce((acc, row) => {
        const price = checkProductBooklet[row.id]
          ? row.priceBooklet
          : row.priceAccess;
        acc[row.id] = (productInputQuantity[row.id] || 1) * price;
        console.log(price);
        console.log(acc[row.id]);
        console.log(acc[row.id]);
        return acc;
      }, {});

    setSumForOneProduct(initialSumForOneTitle);
  }, [products, checkProductBooklet, productInputQuantity]);

  const handleChangeAccessTypeProduct = (event, id) => {
    setSelectProductAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const handleChangeGenerationProduct = (event, id) => {
    setSelectProductGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const handleChangeCheckboxBooklet = (event, id) => {
    setcheckProductBooklet((prevState) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };
  const handleChangeInputQuantity = (event, id) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") {
      setProductInputQuantity((prevState) => ({
        ...prevState,
        [id]: undefined,
      }));
      setIsFieldClearedProduct((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setProductInputQuantity((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
      setIsFieldClearedProduct((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const deleteTitlesNew = (idToDelete) => {
    setProducts(products.filter((product) => product.id !== idToDelete));
    setDeleteTitles(true);
  };
  const stateDeleteTitles = () => {
    setDeleteTitles(false);
  };

  const orders = useSelector((state) => state.adminOrder.orders);
  const ListProductsModal = useSelector((state) => state.adminOrder?.products);
  const listModalTitles = useSelector((state) => state.adminOrder?.modalTitles);
  const ObjectModalOrder = useSelector((state) => state.adminOrder?.modalOrder);
  const listModalPayees = useSelector((state) => state.adminOrder?.payees);
  const allOrganizationsModal = useSelector(
    (state) => state.adminOrder?.allOrganizationsModal
  );

  const allProducts = useSelector((state) => state.adminOrder?.allProducts);
  const allOrganizations = useSelector(
    (state) => state.adminOrder?.allOrganizations
  );
  const allPayees = useSelector((state) => state.adminOrder?.allPayees);

  const allIds = listModalTitles.map((row) => row.id);
  const totalSum = allIds.reduce(
    (acc, id) => acc + (sumForOneTitle[id] || 0),
    0
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrder(accountId)).then(() => setIsLoading(false));
  }, [accountId]);

  useEffect(() => {
    // Find the first open modal
    const openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(
        getOrderModal({ accountId: accountId, orderId: openModalId })
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

  const OpenModal = (id) => {
    setIsLoadingModal(true);
    setOpenStates({ ...openStates, [id]: true });
  };

  const resetStatesNewTitles = () => {
    setcheckProductBooklet({});
    setSelectProductGeneration({});
    setSelectProductAccessType({});
    setProductInputQuantity({});
    setIsFieldClearedProduct({});
    setSumForOneProduct({});
  };
  const resetAddSelectProduct = () => {
    setExitAddSelectProduct(false);
  };
  const handleCloseModal = (id) => {
    setExitAddSelectProduct(true);

    setOpenStates({ ...openStates, [id]: false });

    setProducts(null);
    setIsInputCleared(false);

    resetStatesNewTitles();
    resetStates();
  };

  const handleDeleteOrder = (orderId, titleId) => {
    dispatch(
      deleteTitleOrder({
        accountId: accountId,
        orderId: orderId,
        titleId: titleId,
      })
    ).then(() => {
      dispatch(getOrder(accountId));
      setIsDeleteClicked(true);
    });
  };

  const handleChangeSelectAbbr = (event, id) => {
    setSelectedAbbr((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleChangeGeneration = (event, id) => {
    setSelectedGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value,
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

  const handleCheckboxChangeDeposit = (event) => {
    setSelectedCheckDeposit(event.target.checked);
  };

  const handleChangeAccessType = (event, id) => {
    setSelectedAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleSave = (exitID) => {
    const titlesToUpdate = [];
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
    });

    const titlesToCreate = [];
    products?.forEach((item) => {
      titlesToCreate.push({
        productId: item.id,

        accessType: checkProductBooklet[item.id]
          ? null
          : selectProductAccessType[item.id]
          ? selectProductAccessType[item.id]
          : "Электронный",

        generation: selectProductGeneration[item.id]
          ? selectProductGeneration[item.id]
          : "Второе поколение",

        quantity: productInputQuantity[item.id]
          ? productInputQuantity[item.id]
          : 1,

        addBooklet: checkProductBooklet[item.id]
          ? checkProductBooklet[item.id]
          : false,
      });
    });

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
        isFromDeposit: ObjectModalOrder.selectedCheckDeposit || false,
        titlesToUpdate: titlesToUpdate,
        titlesToCreate: titlesToCreate,
      })
    ).then(() => {
      dispatch(getOrder(accountId));
      setOpenStates({ ...openStates, [exitID]: false });
    });
    handleCloseModal(exitID);
  };

  // Функция для сброса состояний
  const resetStates = () => {
    setExitAddSelectProduct(true);
    resetStatesNewTitles();
    setProducts(null);
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
        [ObjectModalOrder.id]: ObjectModalOrder.organizationName,
      }),
      {}
    );
    setPayeeName(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.payeeName,
      }),
      {}
    );
    setSelectStatus(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.status,
      }),
      {}
    );
    setInputAccountNumber(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.billNumber,
      }),
      {}
    );
  };

  const handleChangeSelectOrganization = (event, id) => {
    setSelectOrganization(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangeSelectStatus = (event, id) => {
    setSelectStatus(() => ({
      [id]: event.target.value,
    }));
  };
  const handleChangePayeeName = (event, id) => {
    setPayeeName(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangeInputAccountNumber = (event, id) => {
    if (event.target.value === "") {
      setIsInputCleared(true);
    } else {
      setIsInputCleared(false);
    }

    setInputAccountNumber(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangeModalAdd = () => {
    dispatch(getNewOrder(accountId));
    setIsOpen(true);
  };

  const handleChangeModalUpdate = () => {
    dispatch(getNewOrder(accountId));
    setIsOpenModalUpdate(true);
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
    textAlign: "center",
  });

  // Typography
  const TypographyStyle = styled(Typography)({
    fontFamily: "'Montserrat'",
    fontSize: "16px",
    fontWeight: 700,
    float: "right",
    marginTop: "15px",
    marginRight: "15px",
    marginBottom: "15px",
  });

  const sortedNumber = () => {};

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
                  onClick={sortedNumber}
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
                      //

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

                      textAlign: "center",
                    }}
                  >
                    {order.formattedDispatchDate}
                  </TableCell>
                  <TableCell
                    onClick={() => OpenModal(order.id)}
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",

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
          {/* <FloatingScrollToTopButton showOnPageScroll={true} /> */}
        </TableContainer>
      )}

      {isLoadingModal ? (
        <Modal open={true}>
          <CircularProgressCustom></CircularProgressCustom>
        </Modal>
      ) : (
        orders.map((element) => (
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
                              {ObjectModalOrder.accountId
                                ? ObjectModalOrder.organizationList?.map(
                                    (organization, index) => (
                                      <MenuItem
                                        key={index}
                                        value={organization}
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "16px",

                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {organization}
                                      </MenuItem>
                                    )
                                  )
                                : allOrganizationsModal?.map((organization) => (
                                    <MenuItem
                                      key={organization.id}
                                      value={organization.organizationName}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {organization.organizationName}
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

                                textAlign: "center",
                                cursor: "pointer",
                                width: "150px",
                              }}
                              value={
                                payeeName[ObjectModalOrder.id] ||
                                ObjectModalOrder.payeeName
                              }
                              onChange={(event) =>
                                handleChangePayeeName(
                                  event,
                                  ObjectModalOrder.id
                                )
                              }
                            >
                              {listModalPayees.map((payee) => (
                                <MenuItem
                                  key={payee.id}
                                  value={payee.name}
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",

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

                              textAlign: "center",
                            }}
                          >
                            <CustomStyledCheckbox
                              sx={{ textAlign: "center" }}
                              checked={selectedCheckDeposit} // Используйте false для неотмеченных чекбоксов
                              onChange={(event) =>
                                handleCheckboxChangeDeposit(event)
                              }
                              size={1}
                            ></CustomStyledCheckbox>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : element.status === "Отправлен" ||
                      element.status === "Оплачен" ? (
                      <TableBody>
                        <TableRow key={ObjectModalOrder.id}>
                          <TableCellModal>
                            {ObjectModalOrder.organizationName}
                          </TableCellModal>
                          <TableCellModal>
                            {ObjectModalOrder.payeeName}
                          </TableCellModal>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Select
                              variant="standard"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",

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
                          <TableCellModal>
                            {ObjectModalOrder.billNumber}
                          </TableCellModal>
                          <TableCellModal>
                            {ObjectModalOrder.isFromDeposit ? (
                              <img src={check} alt="галка" />
                            ) : (
                              <img
                                src={checkbox}
                                alt="галка"
                                style={{ opacity: "0.6" }}
                              />
                            )}
                          </TableCellModal>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <TableBody>
                        <TableRow key={ObjectModalOrder.id}>
                          <TableCellModal>
                            {ObjectModalOrder.organizationName}
                          </TableCellModal>
                          <TableCellModal>
                            {ObjectModalOrder.payeeName}
                          </TableCellModal>
                          <TableCellModal>
                            {ObjectModalOrder.status}
                          </TableCellModal>
                          <TableCellModal>
                            {ObjectModalOrder.billNumber}
                          </TableCellModal>
                          <TableCellModal>
                            {ObjectModalOrder.isFromDeposit ? (
                              <img src={check} alt="галка" />
                            ) : (
                              <img
                                src={checkbox}
                                alt="галка"
                                style={{ opacity: "0.6" }}
                              />
                            )}
                          </TableCellModal>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>

                {listModalTitles[0]?.product.abbreviation == "Д" ? (
                  <TableContainer
                    component={Paper}
                    sx={{
                      maxHeight: "calc(100vh - 350px)",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#005475 #FFFFFF",
                    }}
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
                                top: 0,
                                zIndex: 100,
                                background: "#fff",
                              }}
                            >
                              <IconButton
                                onClick={() => handleChangeModalUpdate()}
                              >
                                <img src={plus} alt="плюс" />
                              </IconButton>
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
                              <TableCellModal>
                                {row.product.abbreviation}
                              </TableCellModal>
                              <TableCell sx={{ textAlign: "center" }}>
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
                                        ? selectedProduct[row.id]
                                            ?.PriceDefinition?.priceBooklet ||
                                            row.price.priceBooklet
                                        : selectedProduct[row.id]
                                            ?.PriceDefinition?.priceAccess ||
                                            row.price.priceAccess
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
                ) : (
                  <>
                    <TableContainer
                      component={Paper}
                      sx={{
                        maxHeight: "calc(100vh - 350px)",
                        overflow: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#005475 #FFFFFF",
                      }}
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
                                  top: 0,
                                  zIndex: 100,
                                  background: "#fff",
                                }}
                              >
                                <IconButton
                                  onClick={() => handleChangeModalUpdate()}
                                >
                                  <img src={plus} alt="плюс" />
                                </IconButton>
                              </TextHeader>
                            ) : (
                              ""
                            )}
                          </TableRow>
                        </TableHead>

                        {element.status === "Активный" ||
                        element.status === "Выставлен счёт" ? (
                          <>
                            <TableBody>
                              {listModalTitles.map((row) => (
                                <TableRow key={row.id}>
                                  <TableCell>
                                    <Select
                                      variant="standard"
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        textAlign: "center",
                                        cursor: "pointer",
                                        width: "70px",
                                      }}
                                      value={
                                        selectedAbbr[row.id] ||
                                        row.product.abbreviation
                                      }
                                      onChange={(event) => {
                                        const newSelectedAbbr =
                                          event.target.value;
                                        const product = ListProductsModal.find(
                                          (p) =>
                                            p.abbreviation === newSelectedAbbr
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
                                      <FormControl
                                        error={!!errors[row.id]}
                                        fullWidth
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
                                          value={
                                            selectedCheck[row.id]
                                              ? null
                                              : selectedAccessType[row.id] ||
                                                row.accessType
                                          }
                                          onChange={(e) =>
                                            handleChangeAccessType(e, row.id)
                                          }
                                          disabled={
                                            selectedCheck[row.id] || false
                                          } // Добавляем условие для отключения
                                          displayEmpty
                                          renderValue={(selected) =>
                                            selected === null ? null : selected
                                          }
                                        >
                                          <MenuItem
                                            value={null}
                                            disabled
                                          ></MenuItem>
                                        </Select>
                                        <FormHelperText error>
                                          {errors[row.id]}
                                        </FormHelperText>
                                      </FormControl>
                                    ) : (
                                      <FormControl
                                        error={!!errors[row.id]}
                                        fullWidth
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
                                          value={
                                            selectedAccessType[row.id] ||
                                            row.accessType
                                          }
                                          onChange={(e) =>
                                            handleChangeAccessType(e, row.id)
                                          }
                                          disabled={
                                            selectedCheck[row.id] || false
                                          } // Добавляем условие для отключения
                                          displayEmpty
                                          renderValue={(selected) =>
                                            selected === null ? null : selected
                                          }
                                        >
                                          <MenuItem
                                            value={null}
                                            disabled
                                          ></MenuItem>

                                          <MenuItem
                                            value="Электронный"
                                            sx={{
                                              fontFamily: "Montserrat",
                                              fontSize: "16px",

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

                                        textAlign: "center",
                                        cursor: "pointer",
                                        width: "200px",
                                      }}
                                      value={
                                        selectedGeneration[row.id] ||
                                        row.generation
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
                                        (isFieldCleared[row.id]
                                          ? ""
                                          : row.quantity)
                                      }
                                      onChange={(e) =>
                                        handleChangeInput(
                                          e,
                                          row.id,
                                          selectedCheck[row.id]
                                            ? selectedProduct[row.id]
                                                ?.PriceDefinition
                                                ?.priceBooklet ||
                                                row.price.priceBooklet
                                            : selectedProduct[row.id]
                                                ?.PriceDefinition
                                                ?.priceAccess ||
                                                row.price.priceAccess
                                        )
                                      }
                                    />
                                  </TableCell>

                                  <TableCellModal>
                                    {selectedCheck[row.id]
                                      ? selectedProduct[row.id]?.PriceDefinition
                                          ?.priceBooklet ||
                                        row.price.priceBooklet
                                      : selectedProduct[row.id]?.PriceDefinition
                                          ?.priceAccess ||
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

                            <TableBody>
                              {Array.isArray(products) &&
                                products?.map((product) => (
                                  <TableRow key={product.id}>
                                    <TableCell
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        color: "black",
                                        textAlign: "center",
                                        width: "70px",
                                      }}
                                    >
                                      {product.name}
                                    </TableCell>

                                    <TableCell>
                                      <Select
                                        variant="standard"
                                        value={
                                          checkProductBooklet[product.id]
                                            ? null
                                            : selectProductAccessType[
                                                product.id
                                              ] || "Электронный"
                                        }
                                        disabled={
                                          checkProductBooklet[product.id] ||
                                          false
                                        } // Добавляем условие для отключения
                                        onChange={(event) =>
                                          handleChangeAccessTypeProduct(
                                            event,
                                            product.id,
                                            product
                                          )
                                        }
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "16px",

                                          color: "black",
                                          textAlign: "center",
                                          cursor: "pointer",
                                          width: "150px",
                                        }}
                                      >
                                        <MenuItem
                                          value="Бумажный"
                                          sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",

                                            color: "#999999",
                                            textAlign: "center",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Бумажный
                                        </MenuItem>
                                        <MenuItem
                                          value="Электронный"
                                          sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",

                                            color: "#999999",
                                            textAlign: "center",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Электронный
                                        </MenuItem>
                                      </Select>
                                    </TableCell>

                                    <TableCell>
                                      <Select
                                        variant="standard"
                                        value={
                                          selectProductGeneration[product.id] ||
                                          "Второе поколение"
                                        }
                                        onChange={(event) =>
                                          handleChangeGenerationProduct(
                                            event,
                                            product.id
                                          )
                                        }
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "16px",
                                          color: "black",
                                          textAlign: "center",
                                          cursor: "pointer",
                                          width: "200px",
                                        }}
                                      >
                                        <MenuItem
                                          value="Первое поколение"
                                          sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",

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

                                        color: "black",
                                        textAlign: "center",
                                      }}
                                    >
                                      <CustomStyledCheckbox
                                        checked={
                                          checkProductBooklet[product.id]
                                        }
                                        onChange={(event) =>
                                          handleChangeCheckboxBooklet(
                                            event,
                                            product.id
                                          )
                                        }
                                      ></CustomStyledCheckbox>
                                    </TableCell>

                                    <TableCell>
                                      <TextField
                                        variant="standard"
                                        sx={{
                                          width: "80px",
                                        }}
                                        type="number"
                                        value={
                                          productInputQuantity[product.id] ||
                                          (isFieldClearedProduct[product.id]
                                            ? ""
                                            : 1)
                                        }
                                        onChange={(event) =>
                                          handleChangeInputQuantity(
                                            event,
                                            product.id,
                                            product
                                          )
                                        }
                                      />
                                    </TableCell>

                                    <TableCell>
                                      {checkProductBooklet[product.id]
                                        ? product.priceBooklet
                                        : product.priceAccess}
                                      &#x20bd;
                                    </TableCell>

                                    <TableCell
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "black",
                                        textAlign: "center",
                                      }}
                                    >
                                      {sumForOneProduct[product.id]} &#x20bd;
                                    </TableCell>

                                    <TableCell
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        color: "black",
                                        textAlign: "center",
                                      }}
                                    ></TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </>
                        ) : (
                          <TableBody>
                            {listModalTitles.map((row) => (
                              <TableRow key={row.id}>
                                <TableCellModal>
                                  {row.product.abbreviation}
                                </TableCellModal>
                                <TableCellModal>
                                  {row.accessType}
                                </TableCellModal>
                                <TableCellModal>
                                  {row.generation}
                                </TableCellModal>
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
                  </>
                )}

                <TypographyStyle>
                  Итого: {totalSum + totalSumProduct} &#x20bd;
                </TypographyStyle>
                {element.status === "Активный" ||
                element.status === "Выставлен счёт" ||
                element.status === "Отправлен" ||
                element.status === "Оплачен" ? (
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
                      onClick={() => handleSave(element.id)}
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#005475",
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
                      onClick={() => resetStates(element.id)}
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
                ) : (
                  ""
                )}
              </Box>
            </div>
          </Modal>
        ))
      )}

      <AddSelectProduct
        isOpenModalUpdate={isOpenModalUpdate}
        allProducts={allProducts}
        setIsOpenModalUpdate={setIsOpenModalUpdate}
        selectProducts={handleChangeModalProduct}
        exitAddSelectProduct={exitAddSelectProduct}
        resetAddSelectProduct={resetAddSelectProduct}
        deleteTitles={deleteTitles}
        stateDeleteTitles={stateDeleteTitles}
        updateProductDelete={products}
      ></AddSelectProduct>

      <Add
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        allPayees={allPayees}
        allOrganizations={allOrganizations}
        allProducts={allProducts}
      ></Add>
    </Box>
  );
}
