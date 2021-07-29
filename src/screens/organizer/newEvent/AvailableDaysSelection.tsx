import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { LeftArrowIcon } from "assets/icons";
import { appContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Sizing } from "styles/index";
import { HeaderText } from "components/rnWrappers/headerText";
import { MonthlyWrapper } from "components/calendar";
import { CalendarWrapperSimple } from "components/calendar/CalendarWrapperSimple";

export interface AvailableDaysSelectionProps {
  navigation: any;
  route: any;
}

export const AvailableDaysSelection = ({
  navigation,
  route,
}: AvailableDaysSelectionProps) => {
  const { colorScheme } = appContext();

  const isLightMode = colorScheme === "light";
  const onBackNavigationPress = () => navigation.goBack();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isLightMode
            ? Colors.primary.neutral
            : Colors.primary.s600,
        },
      ]}>
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <HeaderText
          customStyles={{ marginBottom: Sizing.x10 }}
          colorScheme={colorScheme}>
          Select dates you are available to host event
        </HeaderText>
        <View style={styles.calendarWrapper}>
          <CalendarWrapperSimple isNewEventCalendar>
            <MonthlyWrapper isNewEventCalendar />
          </CalendarWrapperSimple>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  navigation: {
    marginVertical: Sizing.x15,
    alignSelf: "center",
    width: "90%",
  },
  calendarWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
