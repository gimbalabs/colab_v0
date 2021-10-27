import * as React from "react";
import { CalendarEventsList, MonthlyWrapper } from "components/calendar";
import {
  appContext,
  eventCreationContext,
  myCalendarContext,
} from "contexts/contextApi";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Outlines, Buttons, Colors, Typography, Sizing } from "styles/index";
import { useNavigation } from "@react-navigation/native";
import { PlusIcon } from "assets/icons";
import { ProfileContext } from "contexts/profileContext";
import { useCalendarEvents } from "lib/hooks/useCalendarEvents";
import { monthsByName } from "common/types/calendarTypes";

export interface CalendarProps {
  isBookingCalendar?: boolean;
  isHomeScreen?: boolean;
  isRegularCalendar?: boolean;
}

export const Calendar = ({
  isBookingCalendar,
  isHomeScreen,
  isRegularCalendar,
}: CalendarProps) => {
  const { colorScheme } = appContext();
  const { resetState } = eventCreationContext();
  const { id } = React.useContext(ProfileContext);
  const { events, calendarHeader } = myCalendarContext();
  const { getEvents } = useCalendarEvents(id);
  const [isLoading, setIsLoading] = React.useState(true);

  const isLightMode = colorScheme === "light";
  const navigation = useNavigation();

  React.useEffect(() => {
    if (events === null)
      (async () => {
        await getEvents();
      })();

    setIsLoading(false);

    const subscribe = () => {
      navigation.addListener("blur", () => {
        console.log("blur");
      });
      navigation.addListener("focus", async () => {
        console.log("focus");

        setIsLoading(true);
        await getEvents(
          new Date(calendarHeader.year, monthsByName[calendarHeader.month])
        );
        setIsLoading(false);
      });
    };

    const unsubscribe = () => {
      navigation.removeListener("blur", () => {});
      navigation.removeListener("focus", () => {});
    };

    subscribe();

    return unsubscribe;
  }, []);

  const onAddEventPress = () => {
    resetState();
    navigation.navigate("New Event Description");
  };

  const onMonthChange = async () => {
    if (events) setIsLoading(true);

    try {
      await getEvents(
        new Date(calendarHeader.year, monthsByName[calendarHeader.month])
      );

      if (!events) return;

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MonthlyWrapper
        customCallback={onMonthChange}
        isRegularCalendar={isRegularCalendar}
      />
      {(isBookingCalendar == null || isHomeScreen) &&
        (isLoading ? (
          <View style={styles.buttonWrapper}>
            <ActivityIndicator
              animating={true}
              color={isLightMode ? Colors.primary.s800 : Colors.primary.neutral}
              size="large"
              style={{ paddingTop: Sizing.x35 }}
            />
          </View>
        ) : events && events.length ? (
          <CalendarEventsList
            isBookingCalendar={isBookingCalendar}
            isHomeScreen={isHomeScreen}
          />
        ) : (
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={onAddEventPress}
              style={Buttons.applyOpacity(
                Object.assign(
                  {},
                  styles.addEventButton,
                  isLightMode
                    ? { backgroundColor: Colors.primary.s800 }
                    : { backgroundColor: Colors.primary.neutral }
                )
              )}>
              <Text
                style={[
                  styles.addEventButtonText,
                  isLightMode
                    ? { color: Colors.primary.neutral }
                    : { color: Colors.primary.s800 },
                ]}>
                Add Event
              </Text>
              <PlusIcon
                color={
                  isLightMode ? Colors.primary.neutral : Colors.primary.s800
                }
                width={Sizing.x14}
                height={Sizing.x14}
                strokeWidth={3.4}
              />
            </Pressable>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventButton: {
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x10,
    ...Outlines.shadow.base,
  },
  addEventButtonText: {
    ...Typography.header.x20,
    marginRight: Sizing.x5,
  },
});
