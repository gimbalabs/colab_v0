import * as React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import {
  CalendarIcon,
  HearthIcon,
  UserIcon,
  SearchIcon,
  CashStackIcon,
} from "assets/icons/";

import { Colors, Buttons, Sizing, Outlines, Typography } from "styles";

export interface CalendarBottomNavProps {}

export const CalendarBottomNav = () => {
  const onCashStackPress = () => {};
  const onSearchPress = () => {};
  const onHearthPress = () => {};
  const onCalendarPress = () => {};
  const onUserPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.navButtonWrapper}>
        <Pressable
          onPress={onCashStackPress}
          style={Buttons.applyOpacity(styles.navButton)}>
          <CashStackIcon fill="#000" width={24} height={24} />
        </Pressable>
        <Text style={styles.navButtonSubTitle}>Wallet</Text>
      </View>
      <View style={styles.navButtonWrapper}>
        <Pressable
          onPress={onSearchPress}
          style={Buttons.applyOpacity(styles.navButton)}>
          <SearchIcon stroke="#000" width={24} height={24} />
        </Pressable>
        <Text style={styles.navButtonSubTitle}>Browse</Text>
      </View>
      <View style={styles.navButtonWrapper}>
        <Pressable
          onPress={onHearthPress}
          style={Buttons.applyOpacity(styles.navButton)}>
          <HearthIcon stroke="#000" width={24} height={24} />
        </Pressable>
        <Text style={styles.navButtonSubTitle}>My Ideas</Text>
      </View>
      <View style={styles.navButtonWrapper}>
        <Pressable
          onPress={onCalendarPress}
          style={Buttons.applyOpacity(styles.navButton)}>
          <CalendarIcon stroke="#000" width={24} height={24} />
        </Pressable>
        <Text style={styles.navButtonSubTitle}>Availability</Text>
      </View>
      <View style={styles.navButtonWrapper}>
        <Pressable
          onPress={onUserPress}
          style={Buttons.applyOpacity(styles.navButton)}>
          <UserIcon stroke="#000" width={24} height={24} />
        </Pressable>
        <Text style={styles.navButtonSubTitle}>Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "10%",
  },
  navButtonWrapper: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.neutral.s200,
    borderRadius: Sizing.x5,
    alignSelf: "center",
  },
  navButtonSubTitle: {
    ...Typography.body.x5,
  },
});
