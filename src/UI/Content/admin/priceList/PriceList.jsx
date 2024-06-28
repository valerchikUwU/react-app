import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
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
  IconButton,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import { FormControl, Autocomplete, Chip } from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import add from "./add.svg";
import exit from "./exit.svg";
import {
  getModalAbbrevation,
  getPriceList,
  postPrice,
} from "../../../../BLL/admin/priceListSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

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
  color: "#333333BF",
  textAlign: "center",
}));
const TableCellName = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#FFFFFF",
  textAlign: "center",
  colSpan: 6,
  backgroundColor: "#005475",
}));

export default function PriceList() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [priceAccess, setPriceAccess] = useState("");
  const [priceBooklet, setPriceBooklet] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [newInputValue, setNewInputValue] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(dayjs());
  const [modalDate, setModalDate] = useState(dayjs());

  const nameСourses = useSelector((state) => state.adminPriceList.nameСourses);

  const pricesInit = useSelector((state) => state.adminPriceList.pricesInit);
  const pricesMain = useSelector((state) => state.adminPriceList.pricesMain);
  const pricesForEmployers = useSelector(
    (state) => state.adminPriceList.pricesForEmployers
  );

  const [filteredPricesInit, setFilteredPricesInit] = useState([]);
  const [filteredPricesMain, setFilteredPricesMain] = useState([]);
  const [filteredPricesForEmployers, setFilteredPricesForEmployers] = useState(
    []
  );

  const openModal = () => {
    setIsOpen(true);
    dispatch(getModalAbbrevation(accountId));
    console.log(nameСourses);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getPriceList({ accountId: accountId }));
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    const selectedDate = new Date(date);
    const filterPrices = (prices) => {
      return prices.filter((price) => {
        const priceDate = new Date(price.activationDate);
        return (
          selectedDate.getFullYear() > priceDate.getFullYear() ||
          (selectedDate.getMonth() > priceDate.getMonth() &&
            selectedDate.getFullYear() >= priceDate.getFullYear()) ||
          (selectedDate.getDate() >= priceDate.getDate() &&
            selectedDate.getMonth() >= priceDate.getMonth() &&
            selectedDate.getFullYear() >= priceDate.getFullYear())
        );
      });
    };

    setFilteredPricesInit(filterPrices(pricesInit));
    setFilteredPricesMain(filterPrices(pricesMain));
    setFilteredPricesForEmployers(filterPrices(pricesForEmployers));
  }, [date]);

  useEffect(() => {
    validateForm();
  }, [type, name, abbreviation, priceAccess, priceBooklet]); // Зависимости useEffect

  const handleAdd = () => {
    dispatch(
      postPrice({
        accountId: accountId,
        productTypeId: type,
        name: name.name ? name.name : newInputValue,
        abbreviation: abbreviation,
        priceAccess: priceAccess,
        priceBooklet: priceBooklet,
        activationDate: modalDate,
        selectedFile,
      })
    ).then(() => {
      dispatch(getPriceList(accountId));
    });

    resetForm();
  };

  useEffect(() => {
    disabledPolya();
  }, [name, newInputValue]);

  const disabledPolya = () => {
    if (name.name !== null && name.name !== undefined) {
      console.log("name");
      console.log(name.name);
      console.log("name");
      return true;
    } else {
      console.log("newInputValue");
      console.log(newInputValue);
      console.log("newInputValue");
      return false;
    }
  };

  const handleSelect = (event) => {
    setType(event.target.value);
  };

  const handleSelectName = (event, newValue) => {
    if (newValue !== null && newValue !== undefined) {
      setName(newValue);
      setAbbreviation(
        nameСourses.find((item) => item.name === newValue.name)?.abbreviation
      );
      setType(
        nameСourses.find((item) => item.name === newValue.name)?.productTypeId
      );
    }
  };

  const handleInputChange = (event, value) => {
    if (
      value &&
      !nameСourses.some((option) => option.organizationName === value)
    ) {
      // Сохраняем ввод во временном состоянии
      setName("");
      setNewInputValue(value);
      console.log("setNewInputValue");
      console.log(value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;

    if (name === "abbreviation") {
      newValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
    } else if (name === "priceAccess") {
      newValue = value.replace(/[^0-9]/g, "");
    } else if (name === "priceBooklet") {
      newValue = value.replace(/[^0-9]/g, "");
    }

    if (newValue !== undefined) {
      switch (name) {
        case "abbreviation":
          setAbbreviation(newValue);
          break;
        case "priceAccess":
          setPriceAccess(newValue);
          break;
        case "priceBooklet":
          setPriceBooklet(newValue);
          break;
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    console.log("Validating type:", type);
    if (!type) {
      isValid = false;
    }

    console.log("Validating abbreviation:", abbreviation);

    if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(abbreviation)) {
      isValid = false;
    }

    console.log("Validating priceAccess:", priceAccess);
    if (!/^\d+$/.test(priceAccess)) {
      isValid = false;
    }

    console.log("Validating priceBooklet:", priceBooklet);
    if (!/^\d+$/.test(priceBooklet)) {
      isValid = false;
    }

    setIsFormValid(isValid);
    console.log("Form valid:", isFormValid);
  };

  const resetForm = () => {
    setName("");
    setNewInputValue("");
    setAbbreviation("");
    setPriceAccess("");
    setPriceBooklet("");
    setIsFormValid(false);
  };

  // Функция для определения, должен ли день быть отключен
  const disablePastDates = (date) => {
    // Сравниваем дату с текущей датой
    return date.isBefore(dayjs(), "day"); // 'day' здесь означает сравнение по дню, без учета времени
  };

  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Дата"
          format="DD.MM.YYYY"
          value={date}
          onChange={setDate}
        />
      </LocalizationProvider>

      <IconButton sx={{ float: "right" }} onClick={() => openModal()}>
        <img src={add} alt="+" />
      </IconButton>

      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 150px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#005475BF #FFFFFF",
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCellHead>№</StyledTableCellHead>

              <StyledTableCellHead>Курс</StyledTableCellHead>

              <StyledTableCellHead>Полное название</StyledTableCellHead>

              <StyledTableCellHead>Доступ</StyledTableCellHead>

              <StyledTableCellHead>Доп.буклет</StyledTableCellHead>

              <StyledTableCellHead>Дата</StyledTableCellHead>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCellName colSpan={6}>Начальные</TableCellName>
            </TableRow>

            {filteredPricesInit?.map((element, index) => (
              <TableRow key={pricesInit.id}>
                <StyledTableCellBody>{++index}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.productAbbreviation}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.productName.split("&quot;").join('"')}
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceAccess} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceBooklet} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.formattedActivationDate}
                </StyledTableCellBody>
              </TableRow>
            ))}

            <TableRow>
              <TableCellName colSpan={6}>Основные</TableCellName>
            </TableRow>

            {filteredPricesMain?.map((element, index) => (
              <TableRow key={pricesMain.id}>
                <StyledTableCellBody>{++index}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.productAbbreviation}
                </StyledTableCellBody>

                <StyledTableCellBody>{element.productName}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceAccess} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceBooklet} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.formattedActivationDate}
                </StyledTableCellBody>
              </TableRow>
            ))}

            <TableRow>
              <TableCellName colSpan={6}>Для персонала</TableCellName>
            </TableRow>

            {filteredPricesForEmployers?.map((element, index) => (
              <TableRow key={pricesForEmployers.id}>
                <StyledTableCellBody>{++index}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.productAbbreviation}
                </StyledTableCellBody>

                <StyledTableCellBody>{element.productName}</StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceAccess} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.priceBooklet} &#x20bd;
                </StyledTableCellBody>

                <StyledTableCellBody>
                  {element.formattedActivationDate}
                </StyledTableCellBody>
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
                    <StyledTableCellHead>Тип продукта</StyledTableCellHead>
                    <StyledTableCellHead>Название курса</StyledTableCellHead>
                    <StyledTableCellHead>Аббревиатура</StyledTableCellHead>
                    <StyledTableCellHead>Цена курса</StyledTableCellHead>
                    <StyledTableCellHead>Цена буклета</StyledTableCellHead>
                    <StyledTableCellHead>Дата</StyledTableCellHead>
                    <StyledTableCellHead>Добавить картинку</StyledTableCellHead>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <StyledTableCellBody>
                      <Select
                        variant="standard"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          color: "black",
                          textAlign: "center",
                          cursor: "pointer",
                          width: "130px",
                        }}
                        value={type}
                        onChange={handleSelect}
                        disabled={disabledPolya()}
                      >
                        <MenuItem value={1}>Начальные</MenuItem>
                        <MenuItem value={2}>Основные</MenuItem>
                        <MenuItem value={3}>Для персонала</MenuItem>
                      </Select>
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                      <Autocomplete
                        id="size-small-standard"
                        size="small"
                        freeSolo
                        options={nameСourses || []}
                        value={name || ""}
                        onChange={(event, newValue) =>
                          handleSelectName(event, newValue)
                        }
                        onInputChange={handleInputChange}
                        getOptionLabel={(option) =>
                          option.name ? option.name.split("&quot;").join('"') : ""
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Size small"
                            placeholder="Favorites"
                          />
                        )}
                      />
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                      <TextField
                        label="Аббревиатура"
                        variant="standard"
                        value={abbreviation}
                        onChange={handleChange}
                        name="abbreviation"
                        disabled={disabledPolya()}
                      />
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                      <TextField
                        label="Цена курса"
                        variant="standard"
                        value={priceAccess}
                        onChange={handleChange}
                        name="priceAccess"
                      />
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                      <TextField
                        label="Цена буклета"
                        variant="standard"
                        value={priceBooklet}
                        onChange={handleChange}
                        name="priceBooklet" // Добавляем атрибут name
                      />
                    </StyledTableCellBody>

                    <TableCell
                      sx={{
                        fontFamily: '"Montserrat"',
                        fontSize: "16px",

                        color: "#333333BF",
                        textAlign: "center",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Дата"
                          format="DD.MM.YYYY"
                          value={modalDate}
                          onChange={setModalDate}
                          shouldDisableDate={disablePastDates}
                        />
                      </LocalizationProvider>
                    </TableCell>

                    <TableCell>
                      <FormControl variant="standard" fullWidth>
                        <Input
                          id="file"
                          name="image"
                          type="file"
                          multiple
                          label="Выберите файл(ы) для загрузки"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                      </FormControl>
                    </TableCell>
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
