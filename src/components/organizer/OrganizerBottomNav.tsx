import * as React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CalendarIcon,
  UserIcon,
  SearchIcon,
  WalletIcon,
  HomeIcon,
} from "icons/index";
import {
  HomeScreen,
  WalletScreen,
  MyCalendarScreen,
  BrowseScreen,
} from "screens/index";

import { Colors, Buttons, Sizing, Outlines, Typography } from "styles/index";
import { OrganizerProfileScreen } from "screens/organizer/OrganizerProfileScreen";
import { appContext } from "contexts/contextApi";

export interface OrganizerBottomNavProps {}

const Icons = [HomeIcon, SearchIcon, WalletIcon, CalendarIcon, UserIcon];

const Tab = createBottomTabNavigator();

export const OrganizerBottomNav = () => {
  const { auth } = appContext();

  const tabBarOptions = {
    // change color on click, etc...
  };

  const screenOptions = ({ route }: any) => {};

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        {auth ? (
          <>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Browse" component={BrowseScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="Availability" component={MyCalendarScreen} />
            <Tab.Screen name="Profile" component={OrganizerProfileScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Browse" component={BrowseScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="Profile" component={OrganizerProfileScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
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
