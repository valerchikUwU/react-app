import React, { useState } from "react";
import { Alert, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import classes from "./DepositPage.module.css";
import logo from "./logo.svg";
import { styled } from "@mui/system";

// Создаем стилизованный компонент TextField
const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    fontSize: "14px", // Измените размер шрифта метки
    color: "#005475",
  },
  "& .MuiInputBase-input": {
    fontSize: "14px", // Установите размер шрифта текста в поле ввода
    color: "#005475",
  },
});

export default function DepositPage() {
  const [value, setValue] = useState("");
  const [snackbarValue, setSnackbarValue] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || (inputValue > 0 && !isNaN(inputValue))) {
      setValue(inputValue);
    }
  };

  const handleSubmit = () => {
    setSnackbarValue(value); // Устанавливаем значение для Snackbar
    setSnackbarOpen(true); // Открываем Snackbar
    setValue(""); // Очищаем значение в TextField сразу после нажатия кнопки
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Закрываем Snackbar
  };

  return (
    <Grid
      sx={{ mt: "1px" }}
      container
      rowSpacing={2}
      columnSpacing={5}
      className={classes.scroll}
    >
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={logo} alt="logo" className={classes.logo} />
            <div className={classes.nameText}>ДЕПОЗИТ</div>
            <hr></hr>
            <pre className={classes.nameParentText}>
              Остаток: 72 000 &#x20bd;
            </pre>
            <hr></hr>
            <Button
              className={classes.button}
              onClick={handleSubmit}
              disabled={!value}
              sx={{marginTop:'40px'}}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{ textTransform: "none" }}
              >
                Пополнить депозит
              </Typography>
            </Button>
            <StyledTextField
              label="Введите сумму"
              variant="standard"
              value={value}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    ₽
                  </InputAdornment>
                ),
              }}
              className={classes.input}
              sx={{marginTop:'23px'}}
            />
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert severity="info"
              sx={{
                backgroundColor: '#005475', 
                color: 'white', 
                marginLeft:'230px',
                marginBottom:'-10px',
             }}
              > {`Депозит на сумму ${snackbarValue} ₽`}</Alert>
            </Snackbar>
          </div>
        </div>
      </Grid>

    </Grid>
  );
}
