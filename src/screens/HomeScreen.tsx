import * as React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { Colors } from "styles/index";
import { CalendarEventsList } from "components/calendar";
import { ErrorHandler } from "components/errors/errorHandler";
import { Calendar } from "containers/MyCalendar";

export interface HomeProps
  extends StackScreenProps<OrganizerTabParamList, "Home"> {}

export const HomeScreen = ({ navigation }: HomeProps) => {
  const { colorScheme, accountType } = appContext();

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      {accountType === "organizer" ? (
        <ErrorHandler>
          <Calendar />
        </ErrorHandler>
      ) : (
        <View style={styles.main}>
          <CalendarEventsList isHomeScreen={true} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
  },
  main: {
    alignItems: "center",
    flex: 1,
  },
});
