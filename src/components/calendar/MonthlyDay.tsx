import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Buttons, Colors, Outlines, Typography } from "styles/index";
import { DotIcon } from "icons/index";
import { Day } from "interfaces/myCalendarInterface";
import { myCalendarContext } from "contexts/contextApi";
import { getDate, getMonthByIndex, getYear } from "lib/utils";

export interface MonthlyDayProps extends Day {
  year?: number;
  month: string;
  activeDay: number | null;
  setActiveDay: React.Dispatch<React.SetStateAction<number | null>>;
}

export const MonthlyDay = ({
  month,
  number,
  isLastWeek,
  availabilities,
  activeDay,
  setActiveDay,
  scheduledEvents,
  year,
}: MonthlyDayProps) => {
  const { previewDayEvents, previewingDayEvents } = myCalendarContext();

  const isActiveDay = activeDay != null && activeDay === number;
  const isCurrentDay =
    year === getYear() && month === getMonthByIndex() && number === getDate();

  const onPress = () => {
    setActiveDay(number);

    if (
      scheduledEvents == undefined &&
      previewingDayEvents != null &&
      previewingDayEvents.events === undefined
    )
      return;

    const newPreviewingDayEvents = {
      month,
      day: number,
      events: scheduledEvents,
    };
    previewDayEvents(newPreviewingDayEvents);
  };

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
      onPress={onPress}>
      <View
        style={[
          styles.dayButton,
          {
            marginBottom: scheduledEvents ? 2 : 12,
            backgroundColor:
              isActiveDay && !availabilities
                ? Colors.neutral.s150
                : availabilities && isActiveDay
                ? "#7fc7ff"
                : availabilities
                ? "#addcff"
                : "transparent",
          },
        ]}>
        <Text
          style={[styles.dayNumber, { color: isCurrentDay ? "red" : "black" }]}>
          {number}
        </Text>
      </View>
      {scheduledEvents && (
        <DotIcon style={styles.scheduledDay} fill="#F4DF1E" stroke="none" />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayNumber: {
    ...Typography.body.x20,
    ...Typography.roboto.regular,
  },
  dayContainer: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    marginTop: 1,
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
  },
  scheduledDay: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: 10,
    width: 10,
  },
});
