import * as React from "react";

import { View, StyleSheet, LayoutRectangle } from "react-native";
import { Colors, Outlines, Typography, Buttons, Sizing } from "styles";
import { PlaceholderDay } from "./PlaceholderDay";
import { MonthlyDay } from "./MonthlyDay";
import { Month } from "interfaces/myCalendarInterface";

export interface MonthProps extends Month {
  dimensions: LayoutRectangle | null;
  month: string;
}

export const MonthItem = React.memo(
  ({ year, month, days, dimensions }: MonthProps) => {
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
              year={year}
              month={month}
              name={day.name}
              key={`${day.name}-${day.number}-${year}`}
              number={day.number}
              availabilities={day.availabilities}
              scheduledEvents={day.scheduledEvents}
              isLastWeek={day.isLastWeek || false}
            />
          )
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x5,
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
