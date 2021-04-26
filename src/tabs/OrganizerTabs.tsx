import * as React from "react";
import {
  RegisterScreen,
  AddIdeasScreen,
  OrganizerHomeScreen,
  AddBioScreen,
} from "screens/organizer/index";
import { ProfileContextProvider } from "contexts/profileContext";
import { createStackNavigator } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";

const Tab = createStackNavigator<OrganizerTabParamList>();

export const OrganizerTabs = () => {
  return (
    <ProfileContextProvider>
      <Tab.Navigator>
        <Tab.Screen name="Organizer" component={OrganizerHomeScreen} />
        <Tab.Screen name="Register Id" component={RegisterScreen} />
        <Tab.Screen name="Add Bio" component={AddBioScreen} />
        <Tab.Screen name="Add Ideas" component={AddIdeasScreen} />
      </Tab.Navigator>
    </ProfileContextProvider>
  );
};
