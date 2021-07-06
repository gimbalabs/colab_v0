import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BrowseScreen } from "screens/index";
import {
  AvailableDates,
  AvailableTimes,
  DurationChoice,
} from "screens/booking/index";
import { BookingContextProvider } from "contexts/bookingContext";
import { WalletTopUpScreen } from "screens/onboarding";
import { BookingConfirmation } from "screens/payments";

const Stack = createStackNavigator();

export const BrowseScreensStack = () => (
  <BookingContextProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Browse" component={BrowseScreen} />
      <Stack.Screen name="Available Dates" component={AvailableDates} />
      <Stack.Screen name="Available Times" component={AvailableTimes} />
      <Stack.Screen name="Duration Choice" component={DurationChoice} />
      <Stack.Screen name="Add Funds" component={WalletTopUpScreen} />
      <Stack.Screen
        name="Booking Confirmation"
        component={BookingConfirmation}
      />
    </Stack.Navigator>
  </BookingContextProvider>
);
