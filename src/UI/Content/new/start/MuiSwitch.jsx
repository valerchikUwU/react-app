import { styled } from '@mui/system';
import Switch from '@mui/material/Switch';

export const MuiSwitchLarge = styled(Switch)(({ theme }) => ({
 width: '68px', // Задайте ширину в пикселях
 height: '34px', // Задайте высоту в пикселях
 ".MuiSwitch-thumb": {
    backgroundColor: "#005475",
    width: '16px', // Задайте ширину в пикселях
    height: '16px', // Задайте высоту в пикселях
  },
  ".MuiSwitch-track": {
    backgroundColor: "#D9D9D9",
    width: '25px', // Задайте ширину в пикселях
    height: '10px', // Задайте высоту в пикселях
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "+ .MuiSwitch-track": {
        backgroundColor: "#D9D9D9",
        width: '25px', // Задайте ширину в пикселях
        height: '10px', // Задайте высоту в пикселях
      },
      ".MuiSwitch-thumb": {
        backgroundColor: "#005475",
        width: '16px', // Задайте ширину в пикселях
        height: '16px', // Задайте высоту в пикселях
      },
    },
  },

}));
