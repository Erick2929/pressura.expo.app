import { Button, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { themeColors } from "../../config/theme";

const Timer = ({ action }) => {
  let time = 119;
  //   let time = 3;
  const [timeState, setTimeState] = useState(120);

  const [minutes, setMinutes] = useState("2");
  const [seconds, setSeconds] = useState("00");

  const updateCountdown = () => {
    const minutesCD = Math.floor(time / 60);
    let secondsCD = time % 60;

    secondsCD = secondsCD < 10 ? "0" + secondsCD : secondsCD;

    setMinutes(minutesCD);
    setSeconds(secondsCD);
    time--;
    setTimeState(time);
  };
  useEffect(() => {
    if (timeState <= -1) {
      action(false);
    }
  }, [timeState]);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='center'>
      <ProgressCircle
        percent={(timeState * 100) / 120}
        radius={100}
        borderWidth={8}
        color={themeColors.primario}
        shadowColor='#cccccc'
        bgColor='#fff'
      >
        <Text bold fontSize={"6xl"}>
          {minutes + ":" + seconds}
        </Text>
      </ProgressCircle>
      <Button variant='ghost' mt={5} onPress={() => action(false)}>
        Finalizar
      </Button>
    </Center>
  );
};

export default Timer;
