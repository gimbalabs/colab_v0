import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { LeftArrowIcon } from "assets/icons";
import { appContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Sizing } from "styles/index";
import { HeaderText } from "components/rnWrappers/headerText";
import { StackScreenProps } from "@react-navigation/stack";
import { EventCreationParamList } from "common/types/navigationTypes";
import { MonthlyWrapper } from "components/calendar";
import { CalendarWrapperSimple } from "components/calendar/CalendarWrapperSimple";

type Props = StackScreenProps<
  EventCreationParamList,
  "Available Days Selection"
>;

export const AvailableDaysSelection = ({ navigation }: Props) => {
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
        <View style={{ width: "90%" }}>
          <HeaderText
            customStyles={{ marginBottom: Sizing.x10 }}
            colorScheme={colorScheme}>
            Select dates you are available to host event
          </HeaderText>
        </View>
        <CalendarWrapperSimple>
          <MonthlyWrapper isNewEventCalendar />
        </CalendarWrapperSimple>
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
