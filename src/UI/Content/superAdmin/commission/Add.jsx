import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

export default function Add({ isOpen, close }) {
  const dispatch = useDispatch();

  const [text, setText] = useState(); 
  const handleSave = () => {};
  const resetStates = () => {};
  const changeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => close(false)}
        hideBackdrop // Добавлено свойство для улучшения доступности
        sx={{ marginLeft: "27%", marginBottom: "600px" }}
      >
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#005475",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Новый получатель комиссии
          </DialogContentText>
          <hr  style={{ borderTopWidth: '2px', color: '#005475' }}/>
          <TextField
            placeholder="Введите название нового получателя"
            variant="standard"
            sx={{
              width: '300px',
              '.MuiInputBase-input.Mui-disabled': {
                transform: 'skewX(-20deg)',
                translate: 'translateY(-4px)',
              },
            }}
          value={text}
          onChange={changeText}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={(enent) => handleSave(enent)}
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
