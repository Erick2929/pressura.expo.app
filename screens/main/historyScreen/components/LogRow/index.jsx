import { Divider, Flex, Text } from "native-base";
import React from "react";

const LogRow = ({ sis, dis, date }) => {
  return (
    <>
      <Flex w={"90%"} bgColor='gray.200' p={3}>
        <Text fontSize={20}>
          {"Sistólica/Diastólica: " +
            Math.round(sis) +
            "/" +
            Math.round(dis) +
            "."}
        </Text>
        <Text fontSize={12}>{date}</Text>
      </Flex>
      <Divider w={"90%"} />
    </>
  );
};

export default LogRow;
