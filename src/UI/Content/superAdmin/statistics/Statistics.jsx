import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { getStatistics } from "../../../../BLL/superAdmin/statisticsSlice";

dayjs.locale("ru");


export default function Statistics() {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const statistics = useSelector(
    (state) => state.superAdminStatistics?.statistics
  );
  const [date, setDate] = useState(dayjs());
  const [maxSum, setMaxSum] = useState(0); // Добавляем состояние для хранения максимального значения SUM
  useEffect(() => {
    dispatch(getStatistics({accountId, date: date}));
  }, [accountId, date]); // Убрано statistics из списка зависимостей

  useEffect(() => {
    const max = Math.max(...transformedData.map((data) => data.SUM));
    setMaxSum(max);
  }, [accountId, statistics]); // Убрано statistics из списка зависимостей


  const transformedData = useMemo(() => {
    return statistics.map((stat, index) => ({
      date: `${dayjs(stat.dispatchDate).format("DD-MM-YYYY")}`,
      SUM: stat.SUM
    }));
  }, [statistics]);


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Дата"
          format="DD/MM/YYYY"
          value={date}
          onChange={setDate}
        />
      </LocalizationProvider>

      <LineChart
        width={1600} // Увеличьте ширину
        height={450} // Увеличьте высоту
        data={transformedData}
        margin={{ top: 10, right: 40, left: 50, bottom: 80 }} // Уменьшите отступы
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"date"} angle={-90} textAnchor="end" />
        <YAxis domain={[0, maxSum]} /> 
        <Tooltip />
        <Line
          type="linear"
          dataKey="SUM" // Используем SUM в качестве dataKey
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
