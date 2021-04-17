import "react-native-gesture-handler";

import * as React from "react";

import {
  AttendeesScreen,
  BrowseScreen,
  HomeScreen,
  MyCalendarScreen,
} from "screens/index";
import { OrganizerTabs } from "tabs/OrganizerTabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ContextProvider } from "contexts/profileContext";

const Stack = createStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{ title: "Home" }}
            component={HomeScreen}
          />
          <Stack.Screen name="My Calendar" component={MyCalendarScreen} />
          <Stack.Screen name="Attendees" component={AttendeesScreen} />
          <Stack.Screen name="Browse" component={BrowseScreen} />
          <Stack.Screen
            name="Organizer"
            options={{ title: "Organizer" }}
            component={OrganizerTabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
