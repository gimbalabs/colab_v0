import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Buttons, Colors, Sizing, Typography } from "styles/index";
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

    // if (
    //   scheduledEvents == undefined &&
    //   previewingDayEvents != null &&
    //   previewingDayEvents.events === undefined
    // ) {
    //   return;
    // }

    // const newPreviewingDayEvents = {
    //   month,
    //   day: number,
    //   events: scheduledEvents,
    // };
    // previewDayEvents(newPreviewingDayEvents);
    // setActiveDay(number);
  };

  return (
    <Pressable style={[styles.dayContainer]} hitSlop={5} onPress={onPress}>
      <View
        style={[
          styles.dayButton,
          {
            backgroundColor:
              (isCurrentDay && !activeDay) || isActiveDay
                ? Colors.primary.s600
                : availabilities && !isActiveDay
                ? Colors.primary.s180
                : "transparent",
          },
        ]}>
        <Text
          style={[
            styles.dayNumber,
            {
              color:
                isActiveDay || (isCurrentDay && !activeDay)
                  ? "#fff"
                  : Colors.primary.s600,
            },
          ]}>
          {number}
        </Text>
      </View>
      <View style={styles.dotsWrapper}>
        {scheduledEvents && (
          <DotIcon style={styles.scheduledDay} fill="#FCD34D" stroke="none" />
        )}
        {availabilities && (
          <DotIcon style={styles.availableDay} fill="#60A5FA" stroke="none" />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dayNumber: {
    ...Typography.body.x30,
    ...Typography.roboto.medium,
  },
  dotsWrapper: {
    flexDirection: "row",
    marginTop: 2,
    width: "50%",
    justifyContent: "space-evenly",
  },
  dayContainer: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dayButton: {
    borderRadius: 999,
    width: 33,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduledDay: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: Sizing.x7,
    width: Sizing.x7,
  },
  availableDay: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: Sizing.x7,
    width: Sizing.x7,
  },
});
