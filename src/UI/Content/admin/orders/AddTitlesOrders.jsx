import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import deleteGrey from "./image/deleteGrey.svg";
import CustomStyledCheckbox from "../../styledComponents/CustomStyledCheckbox";

export default function AddTitlesOrders({
  products,
  setAddTitlesOrders,
  isHandleSave,
}) {
  const [checkProductBooklet, setcheckProductBooklet] = useState({});
  const [selectProductGeneration, setSelectProductGeneration] = useState({});
  const [selectProductAccessType, setSelectProductAccessType] = useState({});
  const [productInputQuantity, setProductInputQuantity] = useState({});
  const [isFieldClearedProduct, setIsFieldClearedProduct] = useState({});
  const [sumForOneProduct, setSumForOneProduct] = useState({});

  const allIds = Array.isArray(products) && products.map((row) => row.id);
  const totalSum =
    Array.isArray(products) &&
    allIds.reduce((acc, id) => acc + (sumForOneProduct[id] || 0), 0);

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

  const deleteOrder = (id) => {};

  useEffect(() => {
    if (isHandleSave) {
      const titlesToUpdate = [];

      products.forEach((item) => {
        titlesToUpdate.push({
          id: "------------",
          productId: item.id,
          selectProductAccessType: checkProductBooklet[item.id]
            ? null
            : selectProductAccessType[item.id]
            ? selectProductAccessType[item.id]
            : item.selectProductAccessType,
          selectProductGeneration: selectProductGeneration[item.id]
            ? selectProductGeneration[item.id]
            : item.selectProductGeneration,
          productInputQuantity: productInputQuantity[item.id],
          checkProductBooklet: checkProductBooklet[item.id],
        });
      });

      setAddTitlesOrders(titlesToUpdate);
      console.log(`titlesToUpdate ${titlesToUpdate}`);
    }
  }, [isHandleSave]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "50px",
          maxHeight: "calc(100vh - 350px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475 #FFFFFF",
        }}
      >
        <Table stickyHeader>
          <TableBody>
            {Array.isArray(products) &&
              products.map((product) => (
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
                          : selectProductAccessType[product.id] || "Электронный"
                      }
                      disabled={checkProductBooklet[product.id] || false} // Добавляем условие для отключения
                      onChange={(event) =>
                        handleChangeAccessTypeProduct(event, product.id, product)
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
                        handleChangeGenerationProduct(event, product.id)
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
                      checked={checkProductBooklet[product.id]}
                      onChange={(event) =>
                        handleChangeCheckboxBooklet(event, product.id)
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
                        (isFieldClearedProduct[product.id] ? "" : 1)
                      }
                      onChange={(event) =>
                        handleChangeInputQuantity(event, product.id, product)
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
                  >
                    <IconButton onClick={() => deleteOrder(product.id)}>
                      <img src={deleteGrey} alt="удалить" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
