import * as React from "react";
import {
  RegisterScreen,
  AddIdeasScreen,
  OrganizerHomeScreen,
  AddBioScreen,
} from "screens/organizer/index";
import { ContextProvider } from "contexts/profileContext";
import { createStackNavigator } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types";
// import { greaterThan } from "react-native-reanimated";

const Tab = createStackNavigator<OrganizerTabParamList>();

export const OrganizerTabs: React.FunctionComponent = () => {
  return (
    <ContextProvider>
      <Tab.Navigator>
        <Tab.Screen name="Organizer" component={OrganizerHomeScreen} />
        <Tab.Screen name="Register Id" component={RegisterScreen} />
        <Tab.Screen name="Add Bio" component={AddBioScreen} />
        <Tab.Screen name="Add Ideas" component={AddIdeasScreen} />
      </Tab.Navigator>
    </ContextProvider>
  );
};
