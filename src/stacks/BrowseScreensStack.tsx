import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BrowseScreen } from "screens/index";
import { AvailableDates } from "screens/booking/index";

const Stack = createStackNavigator();

export const BrowseScreensStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Browse" component={BrowseScreen} />
    <Stack.Screen name="Available Dates" component={AvailableDates} />
    {/*    <Stack.Screen name="Available Times" component={AvailableTimes} />
    <Stack.Screen name="Duration Choice" component={DurationChoice} />
    <Stack.Screen name="Add Funds" component={AddFunds} />
    <Stack.Screen name="Confirmation" component={Confirmation} /> */}
  </Stack.Navigator>
);
