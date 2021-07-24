import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

import { Buttons, Colors, Outlines, Sizing, Typography } from "styles/index";
import { DotIcon, PartiallyBookedDay } from "icons/index";
import { Day } from "interfaces/myCalendarInterface";
import { getDate, getMonthName, getTime, getYear } from "lib/utils";
import { monthsByName } from "common/types/calendarTypes";

export interface MonthlyDayProps extends Day {
  year?: number;
  month: string;
  activeDay: number | null;
  setActiveDay: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDay?: (arg: any) => any;
}

/**
 *  @description
 *    This component is being used to display days on a regular 'main' calendar.
 */

export const MonthlyDay = ({
  month,
  number,
  availabilities,
  activeDay,
  setActiveDay,
  scheduledEvents,
  year,
}: MonthlyDayProps) => {
  const dayInTime = getTime(year, monthsByName[month], number);
  // const hasAvailabilities = availabilities != null && availabilities.length > 0;

  // Today's day
  const isCurrentDay =
    year === getYear() && month === getMonthName() && number === getDate();

  // Whenever someone has pressed a day or it's a current day
  const isActiveDay = activeDay === number || (!activeDay && isCurrentDay);

  const hasEvents = scheduledEvents != null;

  const onPress = () => {
    setActiveDay(number);
  };

  return React.useMemo(
    () => (
      <Pressable style={[styles.dayContainer]} hitSlop={5} onPress={onPress}>
        <View
          style={[
            styles.dayButton,
            isActiveDay || (isCurrentDay && !activeDay == null)
              ? {
                  ...Outlines.shadow.base,
                  backgroundColor: Colors.primary.s600,
                }
              : {
                  backgroundColor: "transparent",
                },
          ]}>
          <Text
            style={[
              styles.dayNumber,
              {
                color:
                  isActiveDay || (isCurrentDay && !activeDay)
                    ? Colors.primary.neutral
                    : Colors.primary.s600,
              },
            ]}>
            {number}
          </Text>
        </View>
        <View style={styles.dotsWrapper}>
          {scheduledEvents && (
            <DotIcon style={styles.bottomIcon} fill="#FCD34D" stroke="none" />
          )}
          {availabilities && (
            <DotIcon style={styles.bottomIcon} fill="#60A5FA" stroke="none" />
          )}
        </View>
      </Pressable>
    ),
    [isActiveDay]
  );
};

const styles = StyleSheet.create({
  dayNumber: {
    ...Typography.body.x30,
    ...Typography.roboto.medium,
    zIndex: 2,
    // looks like the font is slightly moved to left
    textAlign: "center",
    marginLeft: Sizing.x1,
  },
  dotsWrapper: {
    zIndex: 5,
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
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomIcon: {
    ...Buttons.circular.primary,
    backgroundColor: "transparent",
    flex: 1,
    height: Sizing.x7,
    width: Sizing.x7,
  },
});
