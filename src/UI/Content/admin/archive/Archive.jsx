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
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

import cursor from "./image/cursor-click.svg";
import { getArchive } from "../../../../BLL/admin/archiveSlice";
import CircularProgressCustom from "../../styledComponents/CircularProgress";
import ModalArchive from "./ModalArchive";

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
  "&.hoverEffect": {
    transition: "background-color 0.3s ease",
  },
  "&.hoverEffect:hover": {
    backgroundColor: "#afeeee", // Более темный оттенок #005475
  },
}));

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "16px",
  color: "#333333BF",
  textAlign: "center",
  opacity: "0.75",
  cursor: "pointer",
}));

export default function Archive() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const archive = useSelector((state) => state.adminArchive?.archive);

  const [isLoading, setIsLoading] = useState(false);
  const [sortedArchive, setSortedArchive] = useState([]);
  const [modalIdOrder, setModalIdOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc", // 'asc' или 'desc'
  });

  const sortNumber = (key) => {
    let direction = "asc";

    // Если уже сортируется по этому ключу, меняем направление
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...sortedArchive];

    sortedData.sort((a, b) => {
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      return 0;
    });

    // Особый случай для billNumber с дополнительной сортировкой по dispatchDate
    if (key === "billNumber") {
      sortedData.sort((a, b) => {
        if (a.billNumber > b.billNumber) {
          return direction === "asc" ? 1 : -1;
        } else if (a.billNumber < b.billNumber) {
          return direction === "asc" ? -1 : 1;
        } else {
          if (a.dispatchDate > b.dispatchDate) {
            return 1;
          } else if (a.dispatchDate < b.dispatchDate) {
            return -1;
          }
          return 0;
        }
      });
    }

    setSortedArchive(sortedData);
    setSortConfig({ key, direction });
  };

  // Функция поиска
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setSortedArchive(archive);
      return;
    }

    const filteredData = archive.filter((item) => {
      // Ищем в нескольких полях
      const searchFields = [
        item.orderNumber?.toString(),
        item.fullName,
        item.organizationName,
        item.formattedDispatchDate,
        item.billNumber?.toString(),
        item.SUM?.toString(),
        item.status,
      ];

      return searchFields.some(
        (field) => field && field.toString().toLowerCase().includes(term)
      );
    });

    setSortedArchive(filteredData);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getArchive(accountId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    setSortedArchive([...archive]);
  }, [archive]);
  
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
                  onClick={() => {
                    sortNumber("orderNumber");
                  }}
                >
                  №
                  {sortConfig.key === "orderNumber" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
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
                  onClick={() => {
                    sortNumber("fullName");
                  }}
                >
                  Заказчик
                  {sortConfig.key === "fullName" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
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
                  onClick={() => {
                    sortNumber("organizationName");
                  }}
                >
                  Академия
                  {sortConfig.key === "organizationName" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
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
                  onClick={() => {
                    sortNumber("dispatchDate");
                  }}
                >
                  Дата
                  {sortConfig.key === "dispatchDate" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
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
                  onClick={() => {
                    sortNumber("billNumber");
                  }}
                >
                  № Счета
                  {sortConfig.key === "billNumber" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
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
                <StyledTableCellHead
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                  }}
                >
                  Состояние
                </StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell
                colSpan={7}
                sx={{
                  p: 0,
                  borderBottom: "none",
                  position: "sticky",
                  top: 30, // Прилипает к верху
                  zIndex: 101, // Выше чем у обычных заголовков
                  backgroundColor: "#fff", // Фон чтобы текст не проступал
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Тень для визуального разделения
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Поиск по таблице..."
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSearchTerm("");
                            setSortedArchive(archive);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      backgroundColor: "#fff",
                    },
                  }}
                />
              </TableCell>

              {sortedArchive.map((element) => (
                <TableRow
                  key={element.id}
                  sx={{
                    backgroundColor:
                      element.id === modalIdOrder ? "#0031B01A" : "",
                  }}
                  onClick={() => setModalIdOrder(element.id)}
                >
                  <StyledTableCellBody>
                    {element.id === modalIdOrder ? (
                      <img src={cursor} alt="курсор" />
                    ) : null}
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
                  <StyledTableCellBody>{element.status}</StyledTableCellBody>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {modalIdOrder ? (
        <ModalArchive
          accountId={accountId}
          modalIdOrder={modalIdOrder}
          setModalIdOrder={setModalIdOrder}
        />
      ) : null}
    </div>
  );
}
