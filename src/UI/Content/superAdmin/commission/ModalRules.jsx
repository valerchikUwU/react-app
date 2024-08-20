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
  Chip,
} from "@mui/material";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import add from "./image/add.svg";
import del from "./image/delete.svg";

import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  deleteRule,
  incrementDummyKey,
  putAccrualRule,
} from "../../../../BLL/superAdmin/comissionSlice";
import CircularProgressCustom from "../../styledComponents/CircularProgress";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});
export default function ModalRules({
  isLoadingRules,
  openStates,
  close,
  commision,
}) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [loadingSave, setLoadingSave] = useState(false);
  const [groupProducts, setGroupProducts] = useState({});
  const [newProductsAutocomplete, setNewProductsAutocomplete] = useState([]);
  const [productsAutocomplete, setProductsAutocomplete] = useState({});
  const [selectedAccessType, setSelectedAccessType] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState({});
  const [accrual, setAccrual] = useState({});

  const [isFieldCleared, setIsFieldCleared] = useState({});

  // const [isSave, setIsSave] = useState({});

  const rules = useSelector((state) => state.superAdminCommision?.rules || []);
  const allProducts = useSelector(
    (state) => state.superAdminCommision?.allProducts || []
  );

  const [newProducts, setNewProducts] = useState([]);
  const addProducts = () => {
    setNewProducts([
      ...newProducts,
      {
        id: new Date().toISOString(),
        groupProducts: null,
        products: null,
        generation: null,
        accessType: "Бумажный",
        accrual: null,
      },
    ]);
  };

  const deleteNew = (id) => {
    setNewProducts(newProducts.filter((product) => product.id !== id));
  };
  const deleteOld = (commisionRecieverId, ruleId) => {
    dispatch(
      deleteRule({
        accountId: accountId,
        commisionRecieverId: commisionRecieverId,
        ruleId: ruleId,
      })
    ).then(() => {
      dispatch(incrementDummyKey());
    });
  };

  const handleChangeGroupProducts = (event, id) => {
    setGroupProducts((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleChangeNewProducts = (event, newValue) => {
    const idsOfSelectedProducts = newValue.map(
      (selectedOption) => selectedOption.id
    );
    setNewProductsAutocomplete(idsOfSelectedProducts);
    // console.log(idsOfSelectedProducts);
  };

  // const handleChangeProducts = (event, newValue) => {
  //   rules.map((item) =>
  //     setProductsAutocomplete((prevState) => ({
  //       ...prevState,
  //       [item.id]: newValue,
  //     }))
  //   );
  // };

  const handleChangeProducts = (event, id) => {
    setProductsAutocomplete((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  // useEffect(() => {
  //   const newState = {};
  //   rules.forEach((rule) => {
  //     const matchingProduct = allProducts.find(
  //       (product) => product.id === rule.productId
  //     );
  //     if (matchingProduct) {
  //       newState[rule.id] = matchingProduct;
  //     }
  //   });
  //   setProductsAutocomplete(newState);
  // }, [rules]);

  const handleChangeAccrual = (e, id) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") {
      setAccrual((prevState) => ({
        ...prevState,
        [id]: undefined,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setAccrual((prevState) => ({
        ...prevState,
        [id]: newValue,
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

  useEffect(() => {
    rules.map((item) => {
      setDisabledProductTypeId((prevState) => ({
        ...prevState,
        [item.id]: item.productId ? false : true,
      }));
      setDisabledProductId((prevState) => ({
        ...prevState,
        [item.id]: item.productTypeId ? false : true,
      }));
    });
  }, [rules]);

  const [disabledProductTypeId, setDisabledProductTypeId] = useState({});
  const [disabledProductId, setDisabledProductId] = useState({});

  useEffect(() => {
    rules.map((rules) => {
      if (groupProducts[rules.id]) {
        if (groupProducts[rules.id] === "null") {
          setDisabledProductId((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
          setDisabledProductTypeId((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
        } else {
          setDisabledProductId((prevState) => ({
            ...prevState,
            [rules.id]: true,
          }));
          setDisabledProductTypeId((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
          //Обнуление
          setSelectedGeneration((prevState) => ({
            ...prevState,
            [rules.id]: "null", // Обновляем выбранное значение для данного элемента
          }));
          setSelectedAccessType((prevState) => ({
            ...prevState,
            [rules.id]: "null", // Обновляем выбранное значение для данного элемента
          }));
        }
      }
    });
  }, [groupProducts]);

  useEffect(() => {
    rules.map((rules) => {
      if (productsAutocomplete[rules.id]) {
        if (productsAutocomplete[rules.id] === "null") {
          setDisabledProductTypeId((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
          setDisabledProductId((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
        } else {
          setDisabledProductTypeId((prevState) => ({
            ...prevState,
            [rules.id]: true,
          }));
          setDisabledProductId((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
        }
      }
    });
  }, [productsAutocomplete]);

  const [disabledProductTypeIdNew, setDisabledProductTypeIdNew] = useState({});
  const [disabledProductIdNew, setDisabledProductIdNew] = useState({});

  useEffect(() => {
    newProducts.map((rules) => {
      if (groupProducts[rules.id]) {
        if (groupProducts[rules.id] === "null") {
          setDisabledProductIdNew((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
          setDisabledProductTypeIdNew((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
        } else {
          setDisabledProductIdNew((prevState) => ({
            ...prevState,
            [rules.id]: true,
          }));
          setDisabledProductTypeIdNew((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
          //Обнуление
          setSelectedGeneration((prevState) => ({
            ...prevState,
            [rules.id]: "null", // Обновляем выбранное значение для данного элемента
          }));
          setSelectedAccessType((prevState) => ({
            ...prevState,
            [rules.id]: "null", // Обновляем выбранное значение для данного элемента
          }));
        }
      }
    });
  }, [groupProducts]);

  useEffect(() => {
    newProducts.map((rules) => {
      if (newProductsAutocomplete[rules.id]) {
        if (newProductsAutocomplete[rules.id] === "null") {
          setDisabledProductTypeIdNew((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
          setDisabledProductIdNew((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
        } else {
          setDisabledProductTypeIdNew((prevState) => ({
            ...prevState,
            [rules.id]: true,
          }));
          setDisabledProductIdNew((prevState) => ({
            ...prevState,
            [rules.id]: false,
          }));
        }
      }
    });
  }, [newProductsAutocomplete]);

  const handleSave = (id) => {
    setLoadingSave(true);
    const rulesToUpdate = [];

    rules.forEach((element) => {
      rulesToUpdate.push({
        id: element.id,
        productTypeId: groupProducts[element.id] || element.productTypeId,
        productId: productsAutocomplete[element.id] || element.productId,
        accessType: selectedAccessType[element.id] || element.accessType,
        generation: selectedGeneration[element.id] || element.generation,
        commision: accrual[element.id] || element.commision,
      });
    });

    newProducts.forEach((element) => {
      let a = 0;

      newProductsAutocomplete.map((item) => {
        a += 1;
        rulesToUpdate.push({
          id: null,
          productTypeId: null,
          productId:item,
          accessType: selectedAccessType[element.id],
          generation: selectedGeneration[element.id],
          commision: accrual[element.id],
        });
      });

      if (a === 0) {
        rulesToUpdate.push({
          id: null,
          productTypeId: groupProducts[element.id],
          productId: null,
          accessType: null,
          generation: null,
          commision: accrual[element.id],
        });
      }
    });

    console.log(`rulesToUpdate ${[...rulesToUpdate]}`);
    dispatch(
      putAccrualRule({
        accountId: accountId,
        commisionRecieverId: id,
        rulesToUpdate: rulesToUpdate,
      })
    ).then(() => {
      dispatch(incrementDummyKey());
      setNewProducts([]);
      setLoadingSave(false);
    });
  };

  const resetStates = () => {
    setGroupProducts({});
    setNewProductsAutocomplete([]);
    setProductsAutocomplete({});
    setSelectedAccessType({});
    setSelectedGeneration({});
    setAccrual({});
    setNewProducts([]);
  };

  return (
    <div>
      {isLoadingRules ? (
        <CircularProgressCustom value={"55%"}> </CircularProgressCustom>
      ) : (
        <>
          {loadingSave ? (
            <Modal open={true}>
              <CircularProgressCustom></CircularProgressCustom>
            </Modal>
          ) : (
            <>
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
                          close(element.id);
                          resetStates();
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
                                <IconButton onClick={addProducts}>
                                  <img src={add} alt="плюс" />
                                </IconButton>
                              </TextHeader>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {rules?.map((item, index) => (
                              <TableRow>
                                <TableCell
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    
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
                                    
                                    color: "#333333",
                                    textAlign: "center",
                                  }}
                                >
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "black",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    value={
                                      groupProducts[item.id] === undefined
                                        ? item.productTypeId
                                        : groupProducts[item.id]
                                    }
                                    onChange={(e) =>
                                      handleChangeGroupProducts(e, item.id)
                                    }
                                    disabled={
                                      productsAutocomplete[item.id] ===
                                      undefined
                                        ? item.productId
                                          ? true
                                          : false
                                        : disabledProductTypeId[item.id]
                                    }
                                  >
                                    <MenuItem
                                      value="null"
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
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
                                        
                                        color: "#999999",
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
                                        
                                        color: "#999999",
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
                                        
                                        color: "#999999",
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
                                    
                                    color: "#333333",
                                    textAlign: "center",
                                  }}
                                >
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "black",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "200px",
                                    }}
                                    value={
                                      productsAutocomplete[item.id] ===
                                      undefined
                                        ? item.productId
                                        : productsAutocomplete[item.id]
                                    }
                                    onChange={(e) =>
                                      handleChangeProducts(e, item.id)
                                    }
                                    disabled={
                                      groupProducts[item.id] === undefined
                                        ? item.productTypeId
                                          ? true
                                          : false
                                        : disabledProductId[item.id]
                                    }
                                  >
                                      <MenuItem
                                      value="null"
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
                                    </MenuItem>
                                    {allProducts.map((item) => {
                                      return (
                                        <MenuItem
                                          value={item.id}
                                          sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                            
                                            color: "#999999",
                                            textAlign: "center",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {item.abbreviation}
                                        </MenuItem>
                                      );
                                    })}
                                  
                                  </Select>

                                  {/* {console.log(`item.prodAbbreviation ${item.prodAbbreviation}`)} */}

                                  {/* // values={allProducts[item.id].filter(product => product.id === item.productId) || allProducts} */}

                                  {/* <Autocomplete
                                multiple
                                disabled={disabledProductTypeId[item.id]}
                                disableCloseOnSelect
                                style={{ width: 350 }}


                                values={allProducts}
                                options={allProducts}
                                onChange={handleChangeProducts} 
                                
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Организации"
                                    variant="standard"
                                  />
                                )}

                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({
                                      index,
                                    });
                                    return (
                                      <Chip
                                        variant="outlined"
                                        label={option.abbreviation}
                                        key={key}
                                        {...tagProps}
                                      />
                                    );
                                  })
                                }
                                
                                renderOption={(props, option, { selected }) => (
                                  <li {...props}>
                                    <Checkbox
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                    />
                                    {option.abbreviation}
                                  </li>
                                )}
                              /> */}
                                </TableCell>

                                <TableCell>
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "black",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "200px",
                                    }}
                                    disabled={
                                      groupProducts[item.id] === undefined
                                        ? item.productTypeId
                                          ? true
                                          : false
                                        : disabledProductId[item.id]
                                    }
                                    value={
                                      selectedGeneration[item.id] === "null"
                                        ? null
                                        : selectedGeneration[item.id] ||
                                          item.generation
                                    }
                                    onChange={(e) =>
                                      handleChangeGeneration(e, item.id)
                                    }
                                  >
                                    <MenuItem
                                      value={null}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
                                    </MenuItem>

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
                                    
                                    color: "#333333",
                                    textAlign: "center",
                                  }}
                                >
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "black",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    disabled={
                                      groupProducts[item.id] === undefined
                                        ? item.productTypeId
                                          ? true
                                          : false
                                        : disabledProductId[item.id]
                                    }
                                    value={
                                      selectedAccessType[item.id] === "null"
                                        ? null
                                        : selectedAccessType[item.id] ||
                                          item.accessType
                                    }
                                    onChange={(e) =>
                                      handleChangeAccessType(e, item.id)
                                    }
                                  >
                                    <MenuItem
                                      value={null}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
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
                                  </Select>
                                </TableCell>

                                <TableCell
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    
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
                                      accrual[item.id] ||
                                      (isFieldCleared[item.id]
                                        ? ""
                                        : item.commision)
                                    }
                                    onChange={(e) =>
                                      handleChangeAccrual(e, item.id)
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
                                  <IconButton
                                    onClick={() =>
                                      deleteOld(
                                        item.commisionRecieverId,
                                        item.id
                                      )
                                    }
                                  >
                                    <img src={del} alt="удалить" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>

                          <TableBody>
                            {newProducts?.map((item, index) => (
                              <TableRow>
                                <TableCell
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    
                                    color: "#999999",
                                    textAlign: "center",
                                  }}
                                >
                                  {" "}
                                  {++index + rules.length}
                                </TableCell>

                                <TableCell
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    
                                    color: "#999999",
                                    textAlign: "center",
                                  }}
                                >
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "#999999",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    value={groupProducts[item.id]}
                                    onChange={(e) =>
                                      handleChangeGroupProducts(e, item.id)
                                    }
                                    disabled={disabledProductTypeIdNew[item.id]}
                                  >
                                    <MenuItem
                                      value="null"
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
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
                                        
                                        color: "#999999",
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
                                        
                                        color: "#999999",
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
                                        
                                        color: "#999999",
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
                                    
                                    color: "#333333",
                                    textAlign: "center",
                                  }}
                                >
                                  <Autocomplete
                                    multiple
                                    options={allProducts}
                                    disabled={disabledProductIdNew[item.id]}
                                    disableCloseOnSelect
                                    onChange={handleChangeNewProducts}
                                    getOptionLabel={(option) =>
                                      option.abbreviation
                                    }
                                    renderOption={(
                                      props,
                                      option,
                                      { selected }
                                    ) => (
                                      <li {...props}>
                                        <Checkbox
                                          icon={icon}
                                          checkedIcon={checkedIcon}
                                          style={{ marginRight: 8 }}
                                          checked={selected}
                                        />
                                        {option.abbreviation}
                                      </li>
                                    )}
                                    style={{ width: 350 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Товары"
                                        variant="standard"
                                      />
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "#999999",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "200px",
                                    }}
                                    value={selectedGeneration[item.id]}
                                    onChange={(e) =>
                                      handleChangeGeneration(e, item.id)
                                    }
                                    disabled={disabledProductIdNew[item.id]}
                                  >
                                    <MenuItem
                                      value={null}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
                                    </MenuItem>
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
                                    
                                    color: "#999999",
                                    textAlign: "center",
                                  }}
                                >
                                  <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",
                                      
                                      color: "#999999",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    value={selectedAccessType[item.id]}
                                    onChange={(e) =>
                                      handleChangeAccessType(e, item.id)
                                    }
                                    disabled={disabledProductIdNew[item.id]}
                                  >
                                    <MenuItem
                                      value={null}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        
                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
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
                                  </Select>
                                </TableCell>

                                <TableCell
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    
                                    color: "#999999",
                                    textAlign: "center",
                                  }}
                                >
                                  <TextField
                                    variant="standard"
                                    sx={{
                                      width: "80px",
                                    }}
                                    value={
                                      accrual[item.id] ||
                                      (isFieldCleared[item.id]
                                        ? ""
                                        : item.commision)
                                    }
                                    onChange={(e) =>
                                      handleChangeAccrual(e, item.id)
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
                                  <IconButton
                                    onClick={() => deleteNew(item.id)}
                                  >
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
                          onClick={() => handleSave(element.id)}
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#005475",
                            color: "#FFFFFF",
                            fontFamily: "Montserrat",
                            fontSize: "14px",
                            
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
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
