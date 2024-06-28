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
  Box,
  Button,
  Chip,
  Modal,
  TextField,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { putEditUser } from "../../../../BLL/admin/userSlice";
import CircularProgressCustom from "../../styledComponents/CircularProgress";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function EditUser({ openStates, close, users, isLoadingModal, accountId, changeDummyKey}) {
  const account = useSelector((state) => state.adminUser.editAccount);
  const organizations = useSelector(
    (state) => state.adminUser.editOrganizations
  );

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  //Autocomplete
  const [selectedValues, setSelectedValues] = useState();

  const [isFieldClearedName, setIsFieldClearedName] = useState({});
  const [isFieldClearedLastName, setIsFieldClearedLastName] = useState({});
  const [isFieldClearedTelephone, setIsFieldClearedTelephone] = useState({});
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      putEditUser({
        accountId: accountId, 
        accountFocusId: account.id, 
        firstName: name || account.firstName, 
        lastName: lastName || account.lastName,
        telephoneNumber: telephone || account.telephoneNumber,
        organizationList: selectedValues || account.organizationList,
      })
    ).then(() => {
      changeDummyKey();
      closeModal(account.id);
      console.log(account.id);
    });
  };

const closeModal = (id) => {
  resetInput();
  close(id);
}
  useEffect(() => {
    setSelectedValues(account.organizationList);
  }, [account]);

  const resetInput = () => {
    setName("");
    setLastName("");
    setTelephone("");
    setIsFormValid(true);
    setSelectedValues([]);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    let newValue;

    if (value === "" && name === "name") {
      setIsFieldClearedName((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setIsFieldClearedName((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }

    if (value === "" && name === "lastName") {
      setIsFieldClearedLastName((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setIsFieldClearedLastName((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }

    if (value === "" && name === "telephone") {
      setIsFieldClearedTelephone((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setIsFieldClearedTelephone((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }

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
    // console.log(`isFormValid ${isValid}`);
  };

  const resetStates = () => {
    setName(account.firstName);
    setLastName(account.lastName);
    setTelephone(account.telephoneNumber);
    setSelectedValues( account.organizationList);
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    setSelectedOptions(organizations);
  }, [organizations]); // Добавляем accountId в список зависимостей

  const handleInputChange = (event, value) => {
    if (
      value &&
      !selectedOptions.some((option) => option.organizationName === value)
    ) {
      // Сохраняем ввод во временном состоянии
      setInputValue(value);
    }
  };

  const handleSelectionChange = (event, newValue) => {
    setSelectedValues(newValue);
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
    <>
      {isLoadingModal ? (
        <Modal open={true}>
          <CircularProgressCustom></CircularProgressCustom>
        </Modal>
      ) : (
        <>
          {" "}
          {users?.map((element) => (
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
                    position: "relative",
                    maxHeight: "calc(100vh - 200px)",
                    overflow: "visible",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#005475 #FFFFFF",
                    width: "80%",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      closeModal(element.id);
                      console.log(element.id);
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
                            Имя
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
                            Фамилия
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
                            Телефон
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
                            Организации
                          </TextHeader>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            <TextField
                              label="Имя"
                              variant="standard"
                              value={
                                name ||
                                (isFieldClearedName[account.id]
                                  ? ""
                                  : account.firstName)
                              }
                              onChange={(e) => handleChange(e, account.id)}
                              name="name"
                            ></TextField>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            <TextField
                              label="Фамилия"
                              variant="standard"
                              value={
                                lastName ||
                                (isFieldClearedLastName[account.id]
                                  ? ""
                                  : account.lastName)
                              }
                              onChange={(e) => handleChange(e, account.id)}
                              name="lastName"
                            ></TextField>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            <TextField
                              label="Телефон"
                              variant="standard"
                              value={
                                telephone ||
                                (isFieldClearedTelephone[account.id]
                                  ? ""
                                  : account.telephoneNumber)
                              }
                              name="telephone"
                              onChange={(e) => handleChange(e, account.id)}
                            ></TextField>
                          </TableCell>

                          <TableCell
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            <Autocomplete
                              multiple
                              freeSolo // Позволяет вводить новые значения
                              value={selectedValues?.map((org) => org)} // Задаем начальные выбранные значения
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
                              getOptionLabel={(option) =>
                                option.organizationName
                              }
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
                          </TableCell>
                        </TableRow>
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
  );
}
