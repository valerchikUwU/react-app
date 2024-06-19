import React from "react";
import { CircularProgress } from "@mui/material";

export default function CircularProgressCustom({value}) {
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        top: "45%",
        left: value ? value : "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
