import { Flex, Input } from "native-base";
import React from "react";

const DatePicker = () => {
  return (
    <Flex
      direction='row'
      w={"100%"}
      justifyContent='space-between'
      alignItems={"center"}
    >
      <Input w={"30%"} keyboardType='numeric' placeholder='31' />
      <Input w={"30%"} keyboardType='numeric' placeholder='12' />
      <Input w={"40%"} keyboardType='numeric' placeholder='2023' />
    </Flex>
  );
};

export default DatePicker;
