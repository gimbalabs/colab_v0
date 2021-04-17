import * as React from "react";
import {
  RegisterScreen,
  AddIdeaScreen,
  OrganizerHomeScreen,
  AddBioScreen,
} from "screens/organizer/index";
import { ContextProvider } from "contexts/profileContext";
import { createStackNavigator } from "@react-navigation/stack";
// import { greaterThan } from "react-native-reanimated";

const Tab = createStackNavigator();

export const OrganizerTabs = () => {
  return (
    <ContextProvider>
      <Tab.Navigator headerMode="none">
        <Tab.Screen name="Organizer" component={OrganizerHomeScreen} />
        <Tab.Screen name="Register Id" component={RegisterScreen} />
        <Tab.Screen name="Add Bio" component={AddBioScreen} />
        <Tab.Screen name="Add Ideas" component={AddIdeaScreen} />
      </Tab.Navigator>
    </ContextProvider>
  );
};
