import * as React from "react";
import {
  View,
  StyleSheet,
  LayoutRectangle,
  ActivityIndicator,
  LayoutChangeEvent,
  Text,
  Pressable,
  Animated,
  Easing,
} from "react-native";

import { myCalendarContext } from "contexts/contextApi";
import { Colors, Typography, Sizing, Outlines } from "styles/index";
import { MonthItem } from "./MonthItem";
import { Month } from "interfaces/myCalendarInterface";
import { monthsByName } from "common/types/calendarTypes";
import { WeekDayNames } from "./WeekDayNames";

export const MonthlyWrapper = () => {
  const {
    calendar,
    changeMonthHeader,
    calendarHeader,
    loadMyCalendar,
  } = myCalendarContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  const [currIndex, setCurrIndex] = React.useState<number>(1);
  const [monthsArray, setMonthsArray] = React.useState(calendar);
  const [direction, setDirection] = React.useState<"left" | "right" | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  var animatedOpacity = React.useRef(new Animated.Value(1)).current;
  var animatedTranslateX = React.useRef(new Animated.Value(0)).current;

  const startCalendarAnimation = (
    direction: "left" | "right" | null,
    fadeOut: boolean
  ) => {
    const fadeOutPrevious = direction === "left" && fadeOut;
    const fadeOutNext = direction === "right" && fadeOut;

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: fadeOut ? 0 : 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.sin,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: fadeOutPrevious ? 20 : fadeOutNext ? -20 : 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.sin,
      }),
    ]).start(({ finished }) => {
      if (fadeOutPrevious) {
        setCurrIndex(0);
        animatedTranslateX.setValue(-20);
        Animated.parallel([
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.sin,
          }),
          Animated.timing(animatedTranslateX, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.sin,
          }),
        ]).start();
        onPreviousLoadCalendar();
      }
      if (fadeOutNext) {
        setCurrIndex(2);
        animatedTranslateX.setValue(20);
        Animated.parallel([
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.sin,
          }),
          Animated.timing(animatedTranslateX, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.sin,
          }),
        ]).start();
        onNextLoadCalendar();
      }
    });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
  };

  const loadNewMonths = (nextMonths: boolean, month: number, year?: number) => {
    loadMyCalendar({ nextMonths, month, year });
  };

  const CurrMonth = React.memo(({ item }: { item: Month }) => {
    return (
      <Animated.View
        style={{
          ...styles.monthContainer,
          ...{
            opacity: animatedOpacity,
            transform: [{ translateX: animatedTranslateX }],
            width: dimensions ? dimensions.width : 0,
            height: dimensions ? dimensions.height : 0,
          },
        }}>
        <MonthItem
          days={item.days}
          year={item.year}
          month={item.name}
          firstDayName={item.firstDayName}
          numOfDays={item.numOfDays}
          name={item.name}
          dimensions={dimensions}
        />
      </Animated.View>
    );
  });

  const onPreviousStartAnimation = () => {
    if (isLoading) return;
    setIsLoading(true);
    setDirection("left");

    const calendarHeader = {
      month: calendar[currIndex - 1].name,
      year: calendar[currIndex - 1].year,
    };

    changeMonthHeader(calendarHeader);
    startCalendarAnimation("left", true);
  };

  const onPreviousLoadCalendar = () => {
    const isNotCurrentYear =
      calendar[currIndex - 1].year !== new Date().getFullYear();

    // For the last month of current year
    if (calendarHeader.month === "January") {
      loadNewMonths(
        false,
        monthsByName[monthsArray[currIndex - 1].name],
        isNotCurrentYear ? calendarHeader.year : undefined
      );
    } else if (isNotCurrentYear) {
      // for when the year isnt' the current one
      loadNewMonths(
        false,
        monthsByName[monthsArray[currIndex - 1].name],
        calendarHeader.year
      );
    } else {
      loadNewMonths(false, monthsByName[monthsArray[currIndex - 1].name]);
    }
  };

  const onNextStartAnimation = () => {
    if (isLoading) return;
    setIsLoading(true);
    setDirection("right");

    const calendarHeader = {
      month: calendar[currIndex + 1].name,
      year: calendar[currIndex + 1].year,
    };

    changeMonthHeader(calendarHeader);
    startCalendarAnimation("right", true);
  };

  const onNextLoadCalendar = () => {
    const isNotCurrentYear =
      calendar[currIndex + 1].year !== new Date().getFullYear();

    // if the month is the first month of the next year, pass the next year
    // as last parameter
    if (calendarHeader.month === "January") {
      loadNewMonths(
        true,
        monthsByName[monthsArray[currIndex + 1].name],
        isNotCurrentYear ? calendarHeader.year : undefined
      );
    } else if (isNotCurrentYear) {
      // for when the year isnt' the current one
      loadNewMonths(
        true,
        monthsByName[monthsArray[currIndex + 1].name],
        calendarHeader.year
      );
    } else {
      loadNewMonths(true, monthsByName[monthsArray[currIndex + 1].name]);
    }
  };

  React.useEffect(() => {
    if (direction) {
      setDirection(null);
      setMonthsArray(calendar);
      setCurrIndex(1);
      setIsLoading(false);
    }
  }, [calendar]);

  // Do not pass inline functions as props, as they will be recreated
  // on each component re-render (and slowing down the app)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerMonth_light}>{calendarHeader.month}</Text>
          <Text style={styles.headerYear_light}>{calendarHeader.year}</Text>
        </View>
        <View style={styles.header}>
          <Pressable
            style={{
              padding: 12,
              margin: 5,
              backgroundColor: Colors.primary.s400,
            }}
            onPress={onPreviousStartAnimation}>
            <Text>Prev</Text>
          </Pressable>
          <Pressable
            style={{
              padding: 12,
              margin: 5,
              backgroundColor: Colors.primary.s400,
            }}
            onPress={onNextStartAnimation}>
            <Text>Next</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.calendar}>
        <WeekDayNames />
        <View style={styles.calendarContainer} onLayout={onLayout}>
          {dimensions ? (
            <CurrMonth item={monthsArray[currIndex]} />
          ) : (
            <ActivityIndicator
              color={Colors.primary.s200}
              style={styles.loadingIndicator}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingIndicator: {
    flex: 1,
  },
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
  headerContainer: {
    width: "90%",
    flexDirection: "row",
  },
  header: {
    width: "50%",
    flexDirection: "row",
    marginHorizontal: Sizing.x15,
    marginVertical: Sizing.x5,
    alignSelf: "flex-end",
  },
  headerMonth_light: {
    ...Typography.header.x40,
    color: Colors.primary.s600,
    paddingRight: 5,
  },
  headerMonth_dark: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
    paddingRight: 5,
  },
  headerYear_light: {
    ...Typography.header.x40,
    color: Colors.primary.s300,
    paddingRight: 5,
  },
  headerYear_dark: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
    paddingRight: 5,
  },
  monthContainer: {
    paddingHorizontal: "2%",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    top: 0,
    left: 0,
  },
  daysList: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
