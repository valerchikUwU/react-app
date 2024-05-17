import React, { useState, useEffect } from "react";
import { Alert, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import classes from "./DepositPage.module.css";
import logo from "./logo.svg";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select, MenuItem, FormControl } from "@mui/material";
import { getDeposit, putDeposit } from "../../../../BLL/depositSlice";

// // Создаем стилизованный компонент TextField
// const StyledTextField = styled(TextField)({
//   "& .MuiInputLabel-root": {
//     fontSize: "14px", // Измените размер шрифта метки
//     color: "#005475",
//   },
//   "& .MuiInputBase-input": {
//     fontSize: "14px", // Установите размер шрифта текста в поле ввода
//     color: "#005475",
//   },
// });

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
  const dispatch = useDispatch();
  const { accountId } = useParams();

  useEffect(() => {
    dispatch(getDeposit({ accountId: accountId, typeId: 4 }));
  }, [accountId]);

  const deposit = useSelector((state) => state.deposit.deposit);
  const organizations = useSelector((state) => state.deposit.organizations);

  const handleSubmit = (SUMDeposit, productId, organizationName) => {
    console.log(
      `Submitting with accountId: ${accountId}, SUMDeposit: ${SUMDeposit}, productId: ${productId}, organizationName: ${organizationName}`
    );

    dispatch(
      putDeposit({
        accountId: accountId,
        productData: {
          productId: productId,
          organizationName: organizationName,
          quantity: SUMDeposit,
        },
      })
    ).catch();
    
    setSnackbarValue(SUMDeposit);
    setSnackbarOpen(true);
    setValue("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Закрываем Snackbar
  };

  const [academy, setAcademy] = useState("");

  const [selectedOrganization, setSelectedOrganization] = useState("");

  const handleAcademyChange = (event) => {
    setAcademy(event.target.value);
    const organization = organizations.find(
      (org) => org.id === event.target.value
    );
    setSelectedOrganization(organization);
  };
  // Предполагается, что organizations уже загружены и доступны
  useEffect(() => {
    if (organizations.length > 0) {
      setAcademy(organizations[0].id); // Устанавливаем первую организацию как выбранную по умолчанию
      const organization = organizations.find(
        (org) => org.id === organizations[0].id
      );
      setSelectedOrganization(organization); // Устанавливаем selectedOrganization на основе первой организации
    }
  }, [organizations]);

  return (
    <Grid
      sx={{ mt: "1px" }}
      container
      rowSpacing={2}
      columnSpacing={5}
      className={classes.scroll}
    >
      <Grid item>
        {deposit.map((deposit) => (
          <div className={classes.block}>
            <div className={classes.cartGrid}>
              <img src={logo} alt="logo" className={classes.logo} />
              <div className={classes.nameText}>ДЕПОЗИТ</div>
              <hr style={{ marginBottom: "10px" }}></hr>
              <span
                className={classes.otstup}
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#005475",
                  wordSpacing: "70px", // Existing word spacing
                  marginLeft: "30px", // Add left margin
                }}
              >
                Академия Остаток:
              </span>

              <hr
                style={{ marginTop: "5px", borderTop: "2px solid #005475" }}
              ></hr>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <FormControl variant="standard">
                    <Select
                      labelId="academy-label"
                      id="academy-select"
                      value={academy}
                      onChange={handleAcademyChange}
                      label="Академия"
                      sx={{ width: "130px" }}
                    >
                      {organizations.map((item) => (
                        <MenuItem value={item.id}>
                          {item.organizationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {selectedOrganization && (
                  <pre
                    style={{ marginLeft: "70px" }}
                    className={classes.nameParentText}
                  >
                    {selectedOrganization.allDeposits} &#x20bd;
                  </pre>
                )}
              </div>

              <hr style={{ borderTop: "2px solid #999999" }}></hr>
              <Button
                className={classes.button}
                onClick={() => {
                  if (selectedOrganization) {
                    handleSubmit(
                      value,
                      deposit.id,
                      selectedOrganization.organizationName
                    );
                  }
                }}
                disabled={!value}
                sx={{ marginTop: "20px" }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textTransform: "none" }}
                >
                  Заказать пополнение:
                </Typography>
              </Button>
              <TextField
                label="указать сумму"
                variant="standard"
                value={value}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 1 },
                  endAdornment: (
                    <InputAdornment position="end">₽</InputAdornment>
                  ),
                }}
                className={classes.input}
                sx={{ marginTop: "px" }}
              />
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity="info"
                  sx={{
                    backgroundColor: "#005475",
                    color: "white",
                    marginLeft: "230px",
                    marginBottom: "-10px",
                  }}
                >
                  {`Депозит на сумму ${snackbarValue} ₽`}
                </Alert>
              </Snackbar>
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
