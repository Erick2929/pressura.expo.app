import { Box, Button, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { themeColors } from "../../config/theme";

const Timer = ({ action }) => {
  let time = 119;
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

  const myRef = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      borderWidth: 4,
      borderRadius: 15,
      borderColor: themeColors.primario,
    };
    myRef.current.setNativeProps({
      style: styleObj,
    });
  }, [myRef]);

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='center'>
      <Box
        width='250px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        p='8'
        ref={myRef}
      >
        <Text bold fontSize={"6xl"}>
          {minutes + ":" + seconds}
        </Text>
      </Box>
      <Button variant='ghost' mt={5} onPress={() => action(false)}>
        Finalizar
      </Button>
    </Center>
  );
};

export default Timer;
