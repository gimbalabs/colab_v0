import * as React from "react";

import { View, StyleSheet, LayoutRectangle } from "react-native";
import { Colors, Outlines, Typography, Buttons, Sizing } from "styles";
import { PlaceholderDay, MonthlyDay, MonthlyWeek } from "./";
import { Month } from "interfaces/myCalendarInterface";

export interface MonthProps extends Month {
  dimensions: LayoutRectangle | null;
}

export const MonthItem = React.memo(({ days, dimensions }: MonthProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions ? dimensions.width : 0,
          height: dimensions ? dimensions.height : 0,
        },
      ]}>
      {days.map((day) =>
        day.number === 0 ? (
          <PlaceholderDay key={day.name} />
        ) : (
          <MonthlyDay
            key={`${day.name}-${day.number}`}
            number={day.number}
            isLastWeek={day.isLastWeek || false}
          />
        )
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: Sizing.x20,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  daysList: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
