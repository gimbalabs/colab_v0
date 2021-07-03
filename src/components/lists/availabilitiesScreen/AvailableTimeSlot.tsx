import * as React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export interface AvailableTimeSlotProps {
  time: number;
  index: number;
  onPressCallback: (arg: number) => void;
}

export const AvailableTimeSlot = ({
  time,
  index,
  onPressCallback,
}: AvailableTimeSlotProps) => {
  const onPress = () => onPressCallback(time);

  return (
    <Pressable
      onPress={onPress}
      hitSlop={5}
      key={index}
      style={styles.timeSlotButton}>
      <Text>Hello World</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  timeSlotButton: { flex: 1 },
});
