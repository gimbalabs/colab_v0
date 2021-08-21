import * as React from "react";
import {
  View,
  StyleSheet,
  LayoutRectangle,
  LayoutChangeEvent,
  Text,
  Animated,
  Easing,
} from "react-native";

import { appContext, myCalendarContext } from "contexts/contextApi";
import { Colors, Typography, Sizing, Outlines } from "styles/index";
import { MonthItem } from "./MonthItem";
import { CalendarHeader, Month } from "interfaces/myCalendarInterface";
import { monthsByName } from "common/types/calendarTypes";
import { WeekDayNames } from "./WeekDayNames";
import { CalendarTopNavigation } from "./navigation/calendarTopNavigation";
import { BookingCalendarLegend } from "./booking/BookingCalendarLegend";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { useNavigation } from "@react-navigation/native";

export interface MonthlyWrapperProps {
  isBookingCalendar?: boolean;
  isNewEventCalendar?: boolean;
}

export const MonthlyWrapper = ({
  isBookingCalendar = false,
  isNewEventCalendar = false,
}: MonthlyWrapperProps) => {
  const { calendar, changeMonthHeader, calendarHeader, loadMyCalendar } =
    myCalendarContext();
  const { colorScheme } = appContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  const [currIndex, setCurrIndex] = React.useState<number>(1);
  const [monthsArray, setMonthsArray] = React.useState(calendar);
  const [direction, setDirection] = React.useState<"left" | "right" | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [initialHasLoaded, setInitialHasLoaded] =
    React.useState<boolean>(false);
  const [hasSelectedItem, setHasSelectedItem] = React.useState<boolean>(false);
  const navigation = useNavigation();

  var animatedOpacity = React.useRef(new Animated.Value(1)).current;
  var animatedInitialOpacity = React.useRef(new Animated.Value(0)).current;
  var animatedOpacitySlideIn = React.useRef(new Animated.Value(0)).current;
  var animatedTranslateX = React.useRef(new Animated.Value(0)).current;
  var animatedTranslateXSlideIn = React.useRef(new Animated.Value(0)).current;

  const startCalendarAnimation = (
    direction: "left" | "right" | null,
    fadeOut: boolean
  ) => {
    const fadeOutPrevious = direction === "left" && fadeOut;
    const fadeOutNext = direction === "right" && fadeOut;

    if (fadeOutPrevious) animatedTranslateXSlideIn.setValue(-20);
    if (fadeOutNext) animatedTranslateXSlideIn.setValue(20);

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.sin,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: fadeOutPrevious ? 20 : -20,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.sin,
      }),
      Animated.timing(animatedOpacitySlideIn, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.sin,
      }),
      Animated.timing(animatedTranslateXSlideIn, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
        easing: Easing.sin,
      }),
    ]).start(({ finished }) => {
      setCurrIndex(fadeOutPrevious ? 0 : 2);
      animatedTranslateX.setValue(0);
      animatedTranslateXSlideIn.setValue(0);
      animatedOpacity.setValue(1);
      animatedOpacitySlideIn.setValue(0);
      fadeOutPrevious ? onPreviousLoadCalendar() : onNextLoadCalendar();
    });
  };

  const startInitialCalendarAnimation = () => {
    Animated.timing(animatedInitialOpacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.sin,
      useNativeDriver: true,
    }).start(({ finished }) => finished && setInitialHasLoaded(true));
    setInitialHasLoaded(true);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
    if (!direction && !initialHasLoaded) {
      startInitialCalendarAnimation();
    }
  };

  const loadNewMonths = (nextMonths: boolean, month: number, year?: number) => {
    loadMyCalendar({ nextMonths, month, year });
  };

  const onPlaceholderPress = (direction: string) => {
    if (direction === "previous") onPreviousStartAnimation();
    if (direction === "next") onNextStartAnimation();
  };

  const CurrMonth = React.useCallback(
    ({ item, position }: { item: Month; position: string }) => {
      return (
        <Animated.View
          style={[
            styles.monthContainer,
            position !== "current" && {
              position: "absolute",
              top: 0,
              right: 0,
            },
            {
              opacity: !initialHasLoaded
                ? animatedInitialOpacity
                : position !== "current"
                ? animatedOpacitySlideIn
                : animatedOpacity,
              transform: [
                {
                  translateX:
                    position !== "current"
                      ? animatedTranslateXSlideIn
                      : animatedTranslateX,
                },
              ],
              width: dimensions ? dimensions.width : 0,
              height: dimensions ? dimensions.height : 0,
            },
          ]}>
          <MonthItem
            days={item.days}
            year={item.year}
            month={item.name}
            firstDayName={item.firstDayName}
            numOfDays={item.numOfDays}
            name={item.name}
            dimensions={dimensions}
            onPlaceholderPress={onPlaceholderPress}
            isBookingCalendar={isBookingCalendar}
            isNewEventCalendar={isNewEventCalendar}
            customCallback={itemSelectedCallback}
          />
        </Animated.View>
      );
    },
    [monthsArray, initialHasLoaded]
  );

  const WeekComponent = React.useCallback(() => {
    return (
      <WeekDayNames
        customCallback={itemSelectedCallback}
        isNewEventCalendar={isNewEventCalendar}
      />
    );
  }, [monthsArray, initialHasLoaded]);

  const onPreviousStartAnimation = () => {
    if (isLoading) return;
    setIsLoading(true);
    setDirection("left");

    const calendarHeader: CalendarHeader = {
      month: calendar[currIndex - 1].name,
      year: calendar[currIndex - 1].year,
      numOfEvents: calendar[currIndex - 1]?.numOfEvents,
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
        isNotCurrentYear ? calendar[currIndex - 1].year : undefined
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
      numOfEvents: calendar[currIndex + 1]?.numOfEvents,
    };

    changeMonthHeader(calendarHeader);
    startCalendarAnimation("right", true);
  };

  const onNextLoadCalendar = () => {
    const isNotCurrentYear =
      calendar[currIndex + 1].year !== new Date().getFullYear();

    // if the month is the first month of the next year, pass the next year
    // as last parameter
    if (calendarHeader.month === "December") {
      loadNewMonths(
        true,
        monthsByName[monthsArray[currIndex + 1].name],
        isNotCurrentYear ? calendar[currIndex + 1].year : undefined
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

  /**
   * part related to new-event-creation flow
   */
  const onNextButtonPress = React.useCallback(
    () => navigation.navigate("Available Time Selection"),
    [isNewEventCalendar]
  );
  const itemSelectedCallback = (payload: boolean) => {
    setHasSelectedItem(payload);
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
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text
              style={
                colorScheme === "light"
                  ? styles.headerMonth_light
                  : styles.headerMonth_dark
              }>
              {calendarHeader.month}
            </Text>
            <Text
              style={
                colorScheme === "light"
                  ? styles.headerYear_light
                  : styles.headerYear_dark
              }>
              {calendarHeader.year}
            </Text>
          </View>
          <View style={styles.headerMonthNavigation}>
            <CalendarTopNavigation
              onPreviousPress={onPreviousStartAnimation}
              onNextPress={onNextStartAnimation}
              colorScheme={colorScheme}
              calendarHeader={calendarHeader}
            />
          </View>
        </View>
        <View style={styles.calendar}>
          <WeekComponent />
          <View style={styles.calendarContainer} onLayout={onLayout}>
            {dimensions && calendar && (
              <>
                {direction === "left" && monthsArray[currIndex - 1] && (
                  <CurrMonth
                    position="previous"
                    item={monthsArray[currIndex - 1]}
                  />
                )}

                <CurrMonth position="current" item={monthsArray[currIndex]} />
                {direction === "right" && monthsArray[currIndex + 1] && (
                  <CurrMonth
                    position="next"
                    item={monthsArray[currIndex + 1]}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
      <View style={styles.legendWrapper}>
        {isBookingCalendar && (
          <BookingCalendarLegend colorScheme={colorScheme} />
        )}
      </View>
      {isNewEventCalendar && (
        <FullWidthButton
          text="Next"
          colorScheme={colorScheme}
          disabled={!hasSelectedItem}
          onPressCallback={onNextButtonPress}
          style={styles.button}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  legendWrapper: {
    alignSelf: "flex-start",
  },
  calendarContainer: {
    width: "100%",
    height: Sizing.x150,
    marginTop: Sizing.x7,
  },
  loadingIndicator: {
    flex: 1,
  },
  button: { width: "90%", marginTop: "auto", marginBottom: Sizing.x15 },
  calendar: {
    minHeight: 200,
    width: "100%",
    marginTop: Sizing.x5,
    paddingVertical: Sizing.x10,
    paddingHorizontal: Sizing.x10,
    backgroundColor: "white",
    borderRadius: Outlines.borderRadius.base,
    ...Outlines.shadow.lifted,
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: Sizing.x5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizing.x5,
  },
  header: {
    width: "60%",
    flexDirection: "row",
    marginLeft: Sizing.x8,
    alignItems: "baseline",
  },
  headerMonthNavigation: {
    flexDirection: "row",
    width: Sizing.x80,
    height: "100%",
    marginRight: Sizing.x8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerMonth_light: {
    ...Typography.header.x55,
    color: Colors.primary.s600,
    paddingRight: 5,
    lineHeight: 0,
  },
  headerMonth_dark: {
    ...Typography.header.x55,
    color: Colors.primary.neutral,
    paddingRight: 5,
    lineHeight: 0,
  },
  headerYear_light: {
    ...Typography.header.x35,
    color: Colors.primary.s300,
    paddingRight: 5,
    lineHeight: 0,
  },
  headerYear_dark: {
    ...Typography.header.x35,
    color: Colors.primary.neutral,
    paddingRight: 5,
  },
  monthContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
