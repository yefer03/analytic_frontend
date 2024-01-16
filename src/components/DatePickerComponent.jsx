import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export const DatePickerComponent = ({ dateRange, handleDateChange }) => {
  return (
    <>
      <DatePicker
        selected={dateRange.startDate}
        onChange={(date) => handleDateChange(date, 'startDate')}
        dateFormat="yyyy/MM/dd"
        placeholderText="Seleccione fecha de inicio"
        className="px-4 py-2 lg:mr-5 mb-5 lg:mb-0  rounded-md focus:outline-none"
      />
      <DatePicker
        selected={dateRange.endDate}
        onChange={(date) => handleDateChange(date, 'endDate')}
        dateFormat="yyyy/MM/dd"
        placeholderText="Seleccione fecha de fin"
        className="px-4  py-2 rounded-md focus:outline-none"
      />
    </>
  );
};
