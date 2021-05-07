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
import { AppContextProvider } from "contexts/appContext";
import { AppStackParamList } from "common/types/navigationTypes";

const Stack = createStackNavigator<AppStackParamList>();

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="screen">
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
            options={{ title: "Organizer", headerShown: false }}
            component={OrganizerTabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
