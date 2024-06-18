import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Autocomplete,
  Checkbox,
  Chip,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import {
  getOrganizationList,
  getUser,
  postAccount,
} from "../../../../BLL/admin/userSlice";
import plus from "./image/add.svg";
import check from "./image/checboxCheck.svg";
import unCheck from "./image/checbox.svg";
import exit from "./image/exit.svg";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
  paddingY: 1,
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "#fff",
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#333333BF",
  textAlign: "center",
}));

export default function Users() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const users = useSelector((state) => state.adminUser?.users);
  const organizations = useSelector((state) => state.adminUser.organizations);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [boxSize, setBoxSize] = useState({ height: "auto", width: "auto" }); // Храним размеры <Box>
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setBoxSize({ height: rect.height, width: rect.width });
      console.log(`rect.height - ${rect.height}`);
      console.log(`rect.width - ${rect.width}`);
    }
    console.log(`boxRef.current - ${boxRef.current}`);
  }, [organizations]);

  useEffect(() => {
    dispatch(getUser(accountId));
    // dispatch(getOrganizationList(accountId));
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    setSelectedOptions(organizations);
  }, [organizations]); // Добавляем accountId в список зависимостей

  // Добавьте useEffect для наблюдения за изменениями в telephone
  useEffect(() => {
    validateForm();
  }, [name, lastName, telephone]); // Зависимость от telephone

  const openModal = () => {
    dispatch(getOrganizationList(accountId));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAdd = () => {
    dispatch(
      postAccount({
        accountId: accountId,
        firstName: name,
        lastName: lastName,
        telephoneNumber: telephone,
        organizationList: selectedValues,
      })
    ).then(() => {
      dispatch(getUser(accountId));
    });
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;

    if (name === "name") {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    } else if (name === "lastName") {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    } else if (name === "telephone") {
      newValue = value.replace(/[^\d+]/g, "");
    }

    if (newValue !== undefined) {
      switch (name) {
        case "name":
          setName(newValue);

          break;
        case "lastName":
          setLastName(newValue);

          break;
        case "telephone":
          setTelephone(newValue);

          break;
      }
      validateForm(); // Trigger validation for the active field
    }
  };

  const validateForm = () => {
    // Initialize isValid as true
    let isValid = true;

    // Validate each field individually
    if (!/^([a-zA-Zа-яА-ЯёЁ]{2,})$/.test(name)) {
      isValid = false; // Set to false if name is invalid
    }
    if (!/^([a-zA-Zа-яА-ЯёЁ]{2,})$/.test(lastName)) {
      isValid = false; // Set to false if lastName is invalid
    }
    // Check if telephone is valid
    if (telephone.length !== 11 && telephone.length !== 12) {
      isValid = false; // Set to false if telephone is invalid
    }

    // Set form validity based on all fields' validity
    setIsFormValid(isValid);
    console.log(`isFormValid ${isValid}`);
  };

  const resetForm = () => {
    setName("");
    setLastName("");
    setTelephone("");
    setIsFormValid(false);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // Определяем функцию для обработки выбранных опций
  const handleSelectionChange = (event, newValue) => {
    setSelectedValues(newValue);
  };

  const handleInputChange = (event, value) => {
    if (
      value &&
      !selectedOptions.some((option) => option.organizationName === value)
    ) {
      // Сохраняем ввод во временном состоянии
      setInputValue(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Добавляем новый элемент в selectedOptions при нажатии Enter
      setSelectedOptions((prevOptions) => [
        ...prevOptions,
        { organizationName: inputValue, selected: true },
      ]);
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 90px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475BF #FFFFFF",
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                №
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Имя
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Академии
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Был
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Телефон
              </StyledTableCellHead>

              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                Теллеграм
              </StyledTableCellHead>
              <StyledTableCellHead
                sx={{
                  paddingY: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  background: "#fff",
                }}
              >
                <IconButton onClick={() => openModal()}>
                  <img src={plus} alt="плюс" />
                </IconButton>
              </StyledTableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((element) => (
              <TableRow key={element.id}>
                <StyledTableCellBody>
                  {element.accountNumber}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.firstName + " " + element.lastName}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.organizationList.map((organization, index, array) =>
                    index === array.length - 1
                      ? organization
                      : `${organization}, `
                  )}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.formattedLastSeen}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.telephoneNumber}
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {element.telegramId ? (
                    <img src={check} alt="есть" />
                  ) : (
                    <img src={unCheck} alt="нету" />
                  )}
                </StyledTableCellBody>

                <StyledTableCellBody></StyledTableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
          <Box
            ref={boxRef}
            sx={{
              backgroundColor: "white",
              boxShadow: "0 0 24px rgba(0, 0, 0, 0.5)",
              padding: "4px",
              borderRadius: "10px",
              gridArea: "box",
              alignSelf: "center",
              position: "absolute",
              width: "80%",
              overflow: "visible",
            }}
          >
            <IconButton
              onClick={() => handleClose()}
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
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCellHead>Имя</StyledTableCellHead>
                    <StyledTableCellHead>Фамилия</StyledTableCellHead>
                    <StyledTableCellHead>Телефон</StyledTableCellHead>
                    <StyledTableCellHead>Организации</StyledTableCellHead>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <StyledTableCellBody>
                      <TextField
                        label="Имя"
                        variant="standard"
                        value={name}
                        onChange={handleChange}
                        name="name" // Добавляем атрибут name
                        helperText={!name ? "Необходимо заполнить" : ""}
                      />
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                      <TextField
                        label="Фамилия"
                        variant="standard"
                        value={lastName}
                        onChange={handleChange}
                        name="lastName" // Добавляем атрибут name
                        helperText={!lastName ? "Необходимо заполнить" : ""}
                      />
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                      <TextField
                        label="Телефон"
                        variant="standard"
                        value={telephone}
                        onChange={handleChange}
                        name="telephone" // Добавляем атрибут name
                        helperText={!telephone ? "Начинаться с +7 либо 8" : ""}
                      />
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                      <Autocomplete
                        multiple
                        freeSolo // Позволяет вводить новые значения
                        onInputChange={handleInputChange} // Обработчик для нового ввода значений
                        options={
                          selectedOptions?.length > 0
                            ? selectedOptions.map(
                                (option) => option.organizationName
                              )
                            : organizations.map(
                                (option) => option.organizationName
                              )
                        }
                        disableCloseOnSelect
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
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
                        getOptionLabel={(option) => option.organizationName}
                        onChange={handleSelectionChange}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Организации"
                            placeholder="Favorites"
                            onKeyDown={handleKeyDown} // Обработчик для нажатия клавиш
                            variant="standard"
                          />
                        )}
                      />
                    </StyledTableCellBody>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                textTransform: "none",
                backgroundColor: "#005475",
                color: isFormValid ? "#FFFFFF" : "#999999",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 600,
                marginTop: "30px",
                marginBottom: "20px",
                marginRight: "10px",
                float: "right",
                "&:hover": {
                  backgroundColor: "#00435d",
                },
              }}
              disabled={!isFormValid}
            >
              Добавить
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
