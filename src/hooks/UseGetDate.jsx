import { useState } from 'react';

export const UseGetDate = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [formattedDates, setFormattedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (date, dateType) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Fecha inválida:', date);
      return;
    }

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    setFormattedDates((prevFormattedDates) => ({
      ...prevFormattedDates,
      [`${dateType}`]: formattedDate,
    }));

    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [dateType]: date,
    }));
  };

  return {
    dateRange,
    formattedDates,
    handleDateChange,
    setFormattedDates,
    setDateRange,
  };
};
