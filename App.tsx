import "react-native-gesture-handler";

import * as React from "react";

import Organizer from "./src/screens/organizer/index";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ContextProvider } from "./src/contexts/profileContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Organizer" component={Organizer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
