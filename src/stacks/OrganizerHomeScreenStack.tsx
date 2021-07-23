import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "screens/HomeScreen";
import { NewEventDescription } from "screens/organizer/newEvent";

const Stack = createStackNavigator();

export const OrganizerHomeScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="New Event Description"
        component={NewEventDescription}
      />
    </Stack.Navigator>
  );
};
