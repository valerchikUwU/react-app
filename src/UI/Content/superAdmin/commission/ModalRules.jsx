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
  const { accountId } = useParams();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const resetStates = () => {};
  const [groupProducts, setGroupProducts] = useState({});
  const [newProductsAutucomplete, setNewProductsAutocomplete] = useState([]);
  const [productsItem, setProductsItem] = useState({});
  const [selectedAccessType, setSelectedAccessType] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState({});
  const [accrual, setAccrual] = useState({});

  const [isFieldCleared, setIsFieldCleared] = useState({});

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
        products: "Все",
        generation: null,
        accessType: "Бумажный",
        accrual: null,
      },
    ]);
  };

  const deleteNew = (id) => {
    setNewProducts(newProducts.filter((product) => product.id !== id));
    console.log(id);
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
      [id]: event.target.value, // Обновляем выбранное значение для данного элемента
    }));
  };

  const handleChangeNewProducts = (event, newValue) => {
    setNewProductsAutocomplete(newValue);
    // const idsOfSelectedProducts = newValue.map(
    //   (selectedOption) => selectedOption.id
    // );

    // const productAbbreviation = newValue.map(
    //   (selectedOption) => selectedOption.abbreviation
    // );

    // setProducts((prevState) => ({
    //   ...prevState,
    //   [id]: idsOfSelectedProducts, // Обновляем выбранное значение для данного элемента
    // }));

    // setProductsItem((prevState) => ({
    //   ...prevState,
    //   [id]: [...new Set([...productAbbreviation, ...oldValue])], // Обновляем выбранное значение для данного элемента
    // }));
    // console.log(productsItem);
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

  const handleSave = () => {
    const rulesToUpdate = [];

    // const array = Object.values(products);
    // console.log(array);

    // array[0].forEach((item) => {
    //   rules.forEach((element) => {
    //     rulesToUpdate.push({
    //       // productTypeId: groupProducts[element.id],
    //       productTypeId: null,
    //       productId: item,
    //       accessType: selectedAccessType[element.id],
    //       generation: selectedGeneration[element.id],
    //       commision: accrual[element.id],
    //     });
    //   });
    // });

    newProducts.forEach((element) => {
      rulesToUpdate.push({
        productTypeId: groupProducts[element.id],
        productId: newProductsAutucomplete,
        accessType: selectedAccessType[element.id],
        generation: selectedGeneration[element.id],
        commision: accrual[element.id],
      });
    });

    dispatch(
      putAccrualRule({
        accountId: accountId,
        commisionRecieverId: rules[0].commisionRecieverId,
        rulesToUpdate: rulesToUpdate,
      })
    ).then(() => {
      dispatch(incrementDummyKey());
    });

    console.log(rulesToUpdate[0].commisionRecieverId);
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
                maxWidth:"95%",
              }}
            >
              <IconButton
                onClick={() => close(element.id)}
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
                            value={groupProducts[item.id] || item.productTypeId}
                            onChange={(e) =>
                              handleChangeGroupProducts(e, item.id)
                            }
                            // disabled={}
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
                          {/* { groupProducts[element.id] || element.productTypeId ? 'Все' : "Выбор"} */}
                          {/* <Autocomplete
                            multiple
                            options={allProducts}
                            disableCloseOnSelect
                            value={
                              productsItem[item.id] || [
                                allProducts.find(
                                  (product) => product.id === item.productId
                                )?.abbreviation || "Все",
                              ]
                            }
                            onChange={(event, newValue) => {
                              handleChangeProducts(item.id, newValue, [
                                allProducts.find(
                                  (product) => product.id === item.productId
                                )?.abbreviation,
                              ]);
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => {
                                const { key, ...tagProps } = getTagProps({
                                  index,
                                });
                                return (
                                  <Chip
                                    variant="outlined"
                                    label={option}
                                    key={key}
                                    {...tagProps}
                                  />
                                );
                              })
                            }
                            getOptionLabel={(option) => option.abbreviation}
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
                            style={{ width: 350 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Товары"
                                variant="standard"
                              />
                            )}
                          /> */}
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
                              selectedGeneration[item.id] || item.generation
                            }
                            onChange={(e) => handleChangeGeneration(e, item.id)}
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
                              selectedAccessType[item.id] || item.accessType
                            }
                            onChange={(e) => handleChangeAccessType(e, item.id)}
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
                              accrual[item.id] ||
                              (isFieldCleared[item.id] ? "" : item.commision)
                            }
                            onChange={(e) => handleChangeAccrual(e, item.id)}
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
                          <IconButton
                            onClick={() =>
                              deleteOld(item.commisionRecieverId, item.id)
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
                            fontWeight: 600,
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
                            fontWeight: 600,
                            color: "#999999",
                            textAlign: "center",
                          }}
                        >
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#999999",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={groupProducts[item.id] || item.productTypeId}
                            onChange={(e) =>
                              handleChangeGroupProducts(e, item.id)
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
                              Для персонала
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
                          <Autocomplete
                            multiple
                            options={allProducts}
                            disableCloseOnSelect
                            onChange={() => handleChangeNewProducts()}
                            getOptionLabel={(option) => option.abbreviation}
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
                              fontWeight: 600,
                              color: "#999999",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "200px",
                            }}
                            value={
                              selectedGeneration[item.id] || item.generation
                            }
                            onChange={(e) => handleChangeGeneration(e, item.id)}
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
                            color: "#999999",
                            textAlign: "center",
                          }}
                        >
                          <Select
                            variant="standard"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#999999",
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              selectedAccessType[item.id] || item.accessType
                            }
                            onChange={(e) => handleChangeAccessType(e, item.id)}
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
                              (isFieldCleared[item.id] ? "" : item.commision)
                            }
                            onChange={(e) => handleChangeAccrual(e, item.id)}
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
                          <IconButton onClick={() => deleteNew(item.id)}>
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
