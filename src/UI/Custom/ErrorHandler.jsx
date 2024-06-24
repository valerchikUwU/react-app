import React from "react";
import { Alert, Snackbar} from "@mui/material";

export default function ErrorHandler({error, snackbarOpen, close, text}) {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        close(false); // Закрываем Snackbar
      };

  return (
    <>
      {error === 200 && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert severity="success">{text}</Alert>
        </Snackbar>
      )}
      {error !== 200 && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert severity="error">Ошибка {error}</Alert>
        </Snackbar>
      )}
    </>
  );
}
