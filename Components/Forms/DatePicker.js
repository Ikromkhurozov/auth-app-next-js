import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CommonDatePicker = ({ startDate, setDate, ...rest }) => {
  return (
    <DatePicker
      selected={startDate}
      className="common-datepicker"
      onChange={date => setDate(date)}
      placeholder="dd.mm.yyyy"
      {...rest}
    />
  );
};

export default CommonDatePicker;
