import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { eventCreationContext, myCalendarContext } from "contexts/contextApi";
import { Typography, Colors, Sizing, Outlines } from "../../styles";
import { getRecurringMonthDays } from "lib/helpers";
import { getTime } from "lib/utils";
import { monthsByName } from "common/types/calendarTypes";

const weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type SelectedWeekDays = { [key: string]: any };
const selectedWeekDays: SelectedWeekDays = {
  date: null,
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
};

export const WeekDayNames = ({
  isNewEventCalendar = false,
}: {
  isNewEventCalendar?: boolean;
  customCallback?: (arg: boolean) => void;
}) => {
  const [weekSelection, setWeekSelection] = React.useState<SelectedWeekDays[]>(
    []
  );
  const { calendarHeader } = myCalendarContext();
  const { setSelectedDays, selectedDays } = eventCreationContext();
  const { month, year } = calendarHeader;

  const isSelectedDay = (index: number) =>
    !!weekSelection.length &&
    !!weekSelection[currMonthSelectedWeekIndex()]?.[index];
  const hasCurrentMonthSelectedWeek = React.useCallback(() => {
    return !!weekSelection.find(
      (week) => week.date === getTime(year, monthsByName[month])
    );
  }, [month, year]);
  const currMonthSelectedWeekIndex = React.useCallback(() => {
    return weekSelection.findIndex(
      (week) => week.date === getTime(year, monthsByName[month])
    );
  }, [month, year]);

  const onPress = (index: number): void => {
    const arrOfDays = getRecurringMonthDays(index, year, month);
    let selectRecurring: boolean = arrOfDays
      .map((num: number) => !!selectedDays?.[num])
      .includes(false);

    setWeekSelection((prev: SelectedWeekDays[]) => {
      if (hasCurrentMonthSelectedWeek()) {
        prev[currMonthSelectedWeekIndex()][index] = selectRecurring
          ? true
          : !prev[currMonthSelectedWeekIndex()][index];
      } else {
        let newSelectedWeek = Object.assign({}, selectedWeekDays);
        newSelectedWeek.date = getTime(year, monthsByName[month]);
        newSelectedWeek[index] = selectRecurring ? true : !prev[index];

        prev.push(newSelectedWeek);
      }
      return prev;
    });
    setSelectedDays(arrOfDays, selectRecurring);
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekDays}>
        {weekDays.map((day, i) =>
          !isNewEventCalendar ? (
            <View key={`day-${i}`} style={[styles.dayContainer]}>
              <View style={[styles.dayPlaceholder]}>
                <Text
                  style={[
                    styles.dayTitle,
                    {
                      color: Colors.primary.s600,
                    },
                  ]}>
                  {day}
                </Text>
              </View>
            </View>
          ) : (
            <Pressable
              key={i}
              style={[styles.dayContainer]}
              hitSlop={5}
              onPress={() => onPress(i)}>
              <View
                style={[
                  styles.dayButton,
                  isSelectedDay(i) && styles.selectedDayButton,
                ]}>
                <Text
                  style={[
                    styles.dayTitle,
                    {
                      color: isSelectedDay(i)
                        ? Colors.primary.neutral
                        : Colors.primary.s600,
                    },
                  ]}>
                  {day}
                </Text>
              </View>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dayTitle: {
    ...Typography.body.x30,
    ...Typography.roboto.medium,
    zIndex: 2,
    // looks like the font is slightly moved to left
    textAlign: "center",
    marginLeft: Sizing.x1,
  },
  dayContainer: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dayPlaceholder: {
    width: 33,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  dayButton: {
    width: 33,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: Outlines.borderWidth.thin,
    borderColor: Colors.applyOpacity(Colors.neutral.s400, 0.4),
    ...Outlines.shadow.base,
  },
  selectedDayButton: {
    backgroundColor: Colors.primary.s600,
  },
});
