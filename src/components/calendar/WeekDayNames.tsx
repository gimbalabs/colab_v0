import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sizing, Typography, Colors, Outlines } from "../../styles";

const weekDays: string[] = ["S", "M", "T", "W", "T", "F", "S"];

export const WeekDayNames = () => {
  return (
    <View style={styles.container}>
      <View style={styles.weekDays}>
        {weekDays.map((day, i) => (
          <Text key={i} style={styles.dayLetter}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    borderBottomWidth: Outlines.borderWidth.thin,
    borderBottomColor: Colors.neutral.s400,
  },
  weekDays: {
    flexDirection: "row",
    paddingHorizontal: "2%",
    justifyContent: "space-evenly",
  },
  dayLetter: {
    ...Typography.body.x5,
    paddingLeft: "6%",
    paddingRight: "6%",
  },
});
