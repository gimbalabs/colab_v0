import * as React from "react";
import { WeekDayNames } from "./WeekDayNames";
import { StyleSheet, View } from "react-native";
import { Sizing, Colors, Outlines } from "styles/index";
import { MonthlyWrapper } from "./MonthlyWrapper";

export const MainCalendar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <WeekDayNames />
        <MonthlyWrapper />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    marginHorizontal: Sizing.x10,
  },
  calendar: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Outlines.borderRadius.small,
    borderWidth: Outlines.borderWidth.base,
    borderColor: Colors.neutral.s400,
  },
});
