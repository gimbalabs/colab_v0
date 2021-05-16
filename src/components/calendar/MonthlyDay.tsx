import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Buttons, Colors, Outlines } from "styles";
import { DotIcon } from "icons";
import { Day } from "interfaces/myCalendarInterface";
import { myCalendarContext } from "contexts/contextApi";

export interface MonthlyDayProps extends Day {
  year: number;
  month: string;
}

export const MonthlyDay = ({
  year,
  month,
  number,
  isLastWeek,
  availabilities,
  scheduledEvents,
}: MonthlyDayProps) => {
  const { previewDayEvents } = myCalendarContext();

  const onPress = () => {
    const previewingDayEvents = {
      month,
      events: scheduledEvents,
    };
    scheduledEvents != null && previewDayEvents(previewingDayEvents);
  };

  return (
    <View
      style={[
        styles.dayContainer,
        {
          borderBottomWidth:
            isLastWeek !== undefined && isLastWeek
              ? 0
              : Outlines.borderWidth.thin,
        },
      ]}>
      <Pressable
        style={[
          styles.dayButton,
          {
            marginBottom: scheduledEvents ? 2 : 12,
            backgroundColor: availabilities ? "#ADDCFF" : "transparent",
          },
        ]}
        onPress={onPress}>
        <Text style={styles.dayNumber}>{number}</Text>
      </Pressable>
      {scheduledEvents && (
        <Pressable onPress={onPress}>
          <DotIcon style={styles.scheduledDay} fill="#F4DF1E" stroke="none" />
        </Pressable>
      )}
    </View>
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
    alignItems: "center",
    borderBottomColor: Colors.neutral.s200,
  },
  dayButtonWrapper: {
    flexDirection: "column",
    alignItems: "center",
  },
  dayButton: {
    ...Buttons.circular.primary,
    width: "60%",
    height: "60%",
  },
  scheduledDay: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: 10,
    width: 10,
  },
});
