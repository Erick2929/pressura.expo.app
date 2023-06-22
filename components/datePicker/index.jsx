import { Flex, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { isValidDate } from "../../utils/functions/isValidDate";

const DatePicker = ({ date, setDate, setIsWrongDate }) => {
  const [dayState, setDayState] = useState(date.getDate().toString());
  const [monthState, setMonthState] = useState(
    (date.getMonth() + 1).toString()
  );
  const [yearState, setYearState] = useState(date.getFullYear().toString());
  const [fullDateState, setFullDateState] = useState(date);

  const validateDate = () => {
    if (isValidDate(dayState, monthState, yearState)) {
      setIsWrongDate(false);
    } else {
      setIsWrongDate(true);
    }
  };
  const handleDayChange = (e) => {
    const day = e.nativeEvent.text;
    setDayState(day);
  };
  const handleMonthChange = (e) => {
    const month = e.nativeEvent.text;
    setMonthState(month);
  };
  const handleYearChange = (e) => {
    const year = e.nativeEvent.text;
    setYearState(year);
  };

  useEffect(() => {
    validateDate();
  }, [dayState, monthState, yearState]);

  useEffect(() => {
    console.log("Date Effect");
  }, [dayState, monthState, fullDateState]);

  return (
    <Flex
      direction='row'
      w={"100%"}
      justifyContent='space-between'
      alignItems={"center"}
    >
      <Input
        defaultValue={dayState}
        w={"30%"}
        keyboardType='numeric'
        placeholder='31'
        onChange={handleDayChange}
      />
      <Input
        defaultValue={monthState}
        w={"30%"}
        keyboardType='numeric'
        placeholder='12'
        onChange={handleMonthChange}
      />
      <Input
        defaultValue={yearState}
        w={"40%"}
        keyboardType='numeric'
        placeholder='2023'
        onChange={handleYearChange}
      />
    </Flex>
  );
};

export default DatePicker;
