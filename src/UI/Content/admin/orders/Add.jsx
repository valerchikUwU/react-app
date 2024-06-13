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
  Modal, Typography,
} from "@mui/material";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import CustomStyledCheckbox from "../../styledComponents/CustomStyledCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import plus from "./image/plus.svg";
import { getOrder, putNewOrder } from "../../../../BLL/admin/orderSlice";
import SelectProduct from "./SelectProduct";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

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

export default function Add({
  isOpen,
  setIsOpen,
  allProducts,
  allOrganizations,
  allPayees,
}) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);

// Таблиц выбор  Академиии
  const [selectOrganizationName, setSelectOrganizationName] = useState("");
  const [selectPayee, setSelectPayee] = useState("");
  const [inputAccountNumber, setInputAccountNumber] = useState("");
  const [checkDeposit, setCheckDeposit] = useState(false);

  const [products, setProducts] = useState([]);

  const [isFieldCleared, setIsFieldCleared] = useState({});
// Таблиц с добавлением продуктов
  const [productInputQuantity, setProductInputQuantity] = useState({});
  const [selectProductAccessType, setSelectProductAccessType] = useState({});
  const [selectProductGeneration, setSelectProductGeneration] = useState({});
  const [checkProductBooklet, setcheckProductBooklet] = useState({});
  const [sumForOneProduct, setSumForOneProduct] = useState({});

  // Для заполнения правльной формы
 

  const allIds = Array.isArray(products) && products.map((row) => row.id);
  const totalSum = Array.isArray(products) && allIds.reduce(
    (acc, id) => acc + (sumForOneProduct[id] || 0),
    0
  );

  useEffect(() => {
    // Инициализация sumForOneTitle
    const initialSumForOneTitle = Array.isArray(products) && products.reduce((acc, row) => {  
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


 // Таблиц выбор  Академиии
  const handleChangeInputAccountNumber = (event) => {
    setInputAccountNumber(
      event.target.value // Обновляем выбранное значение для данного элемента
    );
  };
  
  const handleChangeCheckboxDeposit = (event) => {
    setCheckDeposit(event.target.checked);
  };

  const handleChangeSelectOrganization = (event) => {
    setSelectOrganizationName(event.target.value);
  };
  const handleChangeSelectPayee = (event) => {
    setSelectPayee(event.target.value);
  };

  // Таблиц с добавлением продуктов
 const handleChangeAccessType = (event, id) => {
    setSelectProductAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const handleChangeGeneration = (event, id) => {
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
        [id]:undefined,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setProductInputQuantity((prevState) => ({
        ...prevState,
        [id]:newValue,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const handleSave = () => {

    const titlesToCreate = [];
    products.forEach((item) => {
      // Проверяем, существует ли значение для данного id в selectedCheck

      titlesToCreate.push({
        productId: item.id,
        generation: checkProductBooklet[item.id] ? null : selectProductGeneration[item.id] || 'Второе поколение',
        accessType: selectProductAccessType[item.id] || 'Электронный',
        quantity: productInputQuantity[item.id] || 1,
        addBooklet: checkProductBooklet[item.id] || false,
      });
    });

    if (titlesToCreate.length > 0) {
      dispatch(
      putNewOrder({
        accountId: accountId,
        organizationCustomerId: selectOrganizationName,
        status: "Активный",
        billNumber: inputAccountNumber,
        payeeId: selectPayee,
        isFromDeposit: checkDeposit,
        titlesToCreate: titlesToCreate 
      })
    ).then(() => {
      dispatch(getOrder(accountId));
    });
    }
  };

const handleChangeOpenModalProduct = (selectProducts) => {
  
  setProducts(selectProducts);
  setOpenModalAddProduct(true);
}

  const resetStates = () => {};
  return (
    <>
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
          onClick={() => setIsOpen(false)}
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
              <TableBody>
                <TableRow>
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
                        width: "150px",
                      }}
                      value={selectOrganizationName}
                      onChange={(event) =>
                        handleChangeSelectOrganization(event)
                      }
                    >
                      {allOrganizations.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.organizationName}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                        width: "150px",
                      }}
                      value={selectPayee}
                      onChange={(event) => handleChangeSelectPayee(event)}
                    >
                      {allPayees.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
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
                      fontWeight: 600,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Активный
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="standard"
                      sx={{
                        width: "80px",
                      }}
                      value={inputAccountNumber || ""}
                      onChange={(event) =>
                        handleChangeInputAccountNumber(event)
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
                    <CustomStyledCheckbox
                      checked={checkDeposit}
                      onChange={(event) => handleChangeCheckboxDeposit(event)}
                    ></CustomStyledCheckbox>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
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
                    Наименование
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
                    Доп.буклет
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
                      top: 0,
                      zIndex: 100,
                      background: "#fff",
                    }}
                  >
                    <IconButton onClick={handleChangeOpenModalProduct}>
                      <img src={plus} alt="плюс" />
                    </IconButton>
                  </TextHeader>
                </TableRow>
              </TableHead>
              <TableBody>
              {Array.isArray(products) && products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.name}
                  </TableCell>

                  
                  <TableCell>
                    <Select
                      variant="standard"
                      value={checkProductBooklet[product.id] ? null : (selectProductAccessType[product.id] || 'Электронный')}
                      disabled={checkProductBooklet[product.id] || false} // Добавляем условие для отключения
                      onChange={(event) => handleChangeAccessType(event, product.id, product)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                    >
                      <MenuItem value="Бумажный">Бумажный</MenuItem>
                      <MenuItem value="Электронный">Электронный</MenuItem>
                    </Select>
                   
                  </TableCell>

                  <TableCell>
                    <Select
                      variant="standard"
                      value={selectProductGeneration[product.id] || "Второе поколение"}
                      onChange={(event) => handleChangeGeneration(event, product.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                    >
                      <MenuItem value="Первое поколение">
                        Первое поколение
                      </MenuItem>
                      <MenuItem value="Второе поколение">
                        Второе поколение
                      </MenuItem>
                    </Select>
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
                    <CustomStyledCheckbox
                      checked={checkProductBooklet[product.id]}
                      onChange={(event) => handleChangeCheckboxBooklet(event, product.id)}
                    ></CustomStyledCheckbox>
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="standard"
                      sx={{
                        width: "80px",
                      }}
                      type="number"
                      value={productInputQuantity[product.id] || (isFieldCleared[product.id] ? "" : 1)}
                      onChange={(event) => handleChangeInputQuantity(event, product.id, product)}
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
                      fontWeight: 600,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    {sumForOneProduct[product.id]} &#x20bd;
                  </TableCell>
                  
                </TableRow>
              ))}
                
              </TableBody>
            </Table>
          </TableContainer>
          <TypographyStyle>Итого: {totalSum} &#x20bd;</TypographyStyle>
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
<SelectProduct openModalProduct={openModalAddProduct} setOpenModalProduct={setOpenModalAddProduct} allProducts={allProducts} selectProducts={handleChangeOpenModalProduct}></SelectProduct>
    </>
  );
}