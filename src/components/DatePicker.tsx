"use client";

import { FC } from "react";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  reservedDates?: Date[];
};

const DatePicker: FC<Props> = ({ value, onChange, reservedDates }) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={reservedDates}
    />
  );
};

export default DatePicker;
