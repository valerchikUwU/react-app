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
} from "@mui/material";
import { styled } from "@mui/system";
import { getArchive } from "../../../../BLL/admin/archiveSlice";
import CircularProgressCustom from "../../styledComponents/CircularProgress";

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
  opacity: "0.75",
    // Добавляем класс hoverEffect для применения стилей при наведении
    '&.hoverEffect': {
      transition: 'background-color 0.3s ease',
    },
    '&.hoverEffect:hover': {
      backgroundColor: '#afeeee', // Более темный оттенок #005475
    },
  
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  color: "#333333BF",
  textAlign: "center",
  opacity: "0.75",
}));

export default function Archive() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [isLoading, setIsLoading] = useState(false);
  const [dummyKey, setDummyKey] = useState(0); // Dummy state to force re-render
  useEffect(() => {
    setIsLoading(true);
    dispatch(getArchive(accountId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей



  const archive = useSelector((state) => state.adminArchive.archive);
  const [sortedArchive, setSortedArchive] = useState([...archive]);

  const sortNumber = (name) => {
    const sortedData = [...sortedArchive];
    switch(name){
      case 'Number': 
          sortedData.sort((a, b) => {
          if (a.orderNumber > b.orderNumber) {
          return 1;
          } else if (a.orderNumber < b.orderNumber) {
            return -1;
          }
          return 0;
          });
          setSortedArchive(sortedData);
          break;

      case 'fullName': 
          sortedData.sort((a, b) => {
          if (a.fullName > b.fullName) {
          return 1;
          } else if (a.fullName < b.fullName) {
            return -1;
          }
          return 0;
          });
          setSortedArchive(sortedData);
          break;

      case 'organizationName': 
          sortedData.sort((a, b) => {
          if (a.organizationName > b.organizationName) {
          return 1;
          } else if (a.organizationName < b.organizationName) {
            return -1;
          }
          return 0;
          });
          setSortedArchive(sortedData);
          break;

      case 'formattedDispatchDate': 
          sortedData.sort((a, b) => {
          if (a.formattedDispatchDate > b.formattedDispatchDate) {
          return 1;
          } else if (a.formattedDispatchDate < b.formattedDispatchDate) {
            return -1;
          }
          return 0;
          });
          setSortedArchive(sortedData);
          break;
          
      case 'billNumber': 
          sortedData.sort((a, b) => {
          if (a.billNumber > b.billNumber) {
          return 1;
          } else if (a.billNumber < b.billNumber) {
            return -1;
          }
          return 0;
          });
          setSortedArchive(sortedData);
          break;
    }
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgressCustom value={"55%"}></CircularProgressCustom>
      ) : (
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
                  className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {sortNumber('Number')}}
                >
                  №
                </StyledTableCellHead>
                <StyledTableCellHead
                 className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {sortNumber('fullName')}}
                >
                  Заказчик
                </StyledTableCellHead>
                <StyledTableCellHead
                 className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {sortNumber('organizationName')}}
                >
                  Академия
                </StyledTableCellHead>
                <StyledTableCellHead
                 className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {sortNumber('formattedDispatchDate')}}
                >
                  Дата
                </StyledTableCellHead>
                <StyledTableCellHead
                 className="hoverEffect"
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {sortNumber('billNumber')}}
                >
                  № Счета
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
                  Сумма
                </StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedArchive.map((element) => (
                <TableRow key={element.id}>
                  <StyledTableCellBody>
                    {element.orderNumber}
                  </StyledTableCellBody>
                  <StyledTableCellBody>{element.fullName}</StyledTableCellBody>
                  <StyledTableCellBody>
                    {element.organizationName}
                  </StyledTableCellBody>
                  <StyledTableCellBody>
                    {element.formattedDispatchDate}
                  </StyledTableCellBody>
                  <StyledTableCellBody>
                    {element.billNumber}
                  </StyledTableCellBody>
                  <StyledTableCellBody>
                    {element.SUM} &#x20bd;
                  </StyledTableCellBody>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
