import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Button, Colors, Sizing, Outlines } from "styles";

export interface MonthlyDayProps {
  hasAvailability?: boolean;
  hasBookedMeeting?: boolean;
  number: number;
  isLastWeek: boolean;
}

export const MonthlyDay = ({ number, isLastWeek }: MonthlyDayProps) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Pressable
      style={[
        styles.dayContainer,
        {
          borderBottomWidth:
            isLastWeek !== undefined && isLastWeek
              ? 0
              : Outlines.borderWidth.thin,
        },
      ]}
      onPress={() => setPressed((prev) => !prev)}>
      <Text style={[styles.dayNumber, { color: pressed ? "red" : "black" }]}>
        {number}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayNumber: {
    textAlign: "center",
  },
  dayContainer: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "center",
    borderBottomColor: Colors.neutral.s200,
  },
});
