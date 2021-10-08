import * as React from "react";
import {
  CalendarEventsList,
  CalendarWrapper,
  MonthlyWrapper,
} from "components/calendar";
import { appContext } from "contexts/contextApi";
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

export interface CalendarProps {
  isBookingCalendar?: boolean;
  isHomeScreen?: boolean;
}

export const Calendar = ({
  isBookingCalendar,
  isHomeScreen,
}: CalendarProps) => {
  const { colorScheme } = appContext();
  const { id } = React.useContext(ProfileContext);
  const { isLoading, events } = useCalendarEvents(id);
  const isLightMode = colorScheme === "light";
  const navigation = useNavigation();

  const onAddEventPress = () => {
    navigation.navigate("New Event Description");
  };

  return (
    <CalendarWrapper>
      <MonthlyWrapper />
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
          <CalendarEventsList isBookingCalendar isHomeScreen />
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
    </CalendarWrapper>
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
