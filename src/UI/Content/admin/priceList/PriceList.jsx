import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import {InputLabel, FormControl, Autocomplete, Chip } from '@mui/material';
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import add from "./add.svg";
import exit from "./exit.svg";
import { getModalAbbrevation, getPriceList, postPrice } from "../../../../BLL/admin/priceListSlice";
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
  fontWeight: 600,
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
  const [type, setType] = useState("");
  const [date, setDate] = useState(dayjs());
  const [modalDate, setModalDate] = useState(dayjs());

  const nameСourses = useSelector((state) => state.adminPriceList.nameСourses);

  const pricesInit = useSelector((state) => state.adminPriceList.pricesInit);
  const pricesMain = useSelector((state) => state.adminPriceList.pricesMain);
  const pricesForEmployers = useSelector(
    (state) => state.adminPriceList.pricesForEmployers
  );

  const openModal = () => {
    setIsOpen(true);
    dispatch(getModalAbbrevation({accountId}));
    console.log(nameСourses);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(date.format("DD-MM-YYYY"));
    dispatch(getPriceList({ accountId, date: date }));
  }, [dispatch, accountId, date]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    validateForm();
  }, [type, name, abbreviation, priceAccess, priceBooklet]); // Зависимости useEffect

  const handleAdd = () => {
    dispatch(
      postPrice({
        accountId: accountId,
        productTypeId: type,
        name: name,
        abbreviation: abbreviation,
        priceAccess: priceAccess,
        priceBooklet: priceBooklet,
        activationDate: modalDate,
      })
    ).then(() => {
      dispatch(getPriceList(accountId));
    });

    resetForm();
  };

  const handleSelect = (event) => {
    setType(event.target.value);
  };

  const handleSelectName = (event) => {
    setName(event.target.value);
    setAbbreviation(nameСourses.find((item) => (item.name == event.target.value))?.abbreviation);
    setType(nameСourses.find((item) => (item.name == event.target.value))?.productTypeId);
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
    setAbbreviation("");
    setPriceAccess("");
    setPriceBooklet("");
    setIsFormValid(false);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date"
          inputFormat="DD-MM-YYYY" // Измененный формат даты
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

            {pricesInit.map((element, index) => (
              <TableRow key={pricesInit.id}>
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
              <TableCellName colSpan={6}>Основные</TableCellName>
            </TableRow>

            {pricesMain.map((element, index) => (
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

            {pricesForEmployers.map((element, index) => (
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
          <IconButton
            onClick={() => handleClose()}
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
              width: "80%",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#005475 #FFFFFF",
            }}
          >
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
                          fontWeight: 600,
                          color: "black",
                          textAlign: "center",
                          cursor: "pointer",
                          width: "130px",
                        }}
                        value={type}
                        onChange={handleSelect}
                      >
                        <MenuItem value={1}>Начальные</MenuItem>
                        <MenuItem value={2}>Основные</MenuItem>
                        <MenuItem value={3}>Для персонала</MenuItem>
                      </Select>
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                    <Select
                        variant="standard"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "center",
                          cursor: "pointer",
                          width: "130px",
                        }}
                        value={name}
                        onChange={handleSelectName}
                      >
                      
                        {nameСourses.map((item) => {
                          return <MenuItem value={item.name}>{item.name}</MenuItem>
                        })}
                        
                 
                      </Select>
                    </StyledTableCellBody>

                    <StyledTableCellBody>
                    <TextField
                        label="Аббревиатура"
                        variant="standard"
                        value={abbreviation}
                        onChange={handleChange}
                        name="abbreviation"
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
                        fontWeight: 600,
                        color: "#333333BF",
                        textAlign: "center",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Дата"
                          inputFormat="MM/DD/YYYY"
                          value={modalDate}
                          onChange={setModalDate}
                        />
                      </LocalizationProvider>
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
