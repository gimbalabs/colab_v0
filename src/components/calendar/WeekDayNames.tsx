import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { appContext } from "contexts/contextApi";
import { Sizing, Typography, Colors, Outlines } from "../../styles";

const weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const WeekDayNames = () => {
  const { colorScheme } = appContext();
  const lightMode = colorScheme === "light";

  return (
    <View style={styles.container}>
      <View style={styles.weekDays}>
        {weekDays.map((day, i) => (
          <Text
            key={i}
            style={lightMode ? styles.dayLetter_light : styles.dayLetter_dark}>
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
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dayLetter_light: {
    ...Typography.subHeader.x30,
    color: Colors.primary.s350,
    width: `${100 / 7}%`,
    textAlign: "center",
  },
  dayLetter_dark: {
    ...Typography.subHeader.x30,
    color: Colors.primary.s350,
    width: `${100 / 7}%`,
    textAlign: "center",
  },
});
