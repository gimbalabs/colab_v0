import * as React from "react";
import {
  RegisterScreen,
  AddIdeaScreen,
  OrganizerScreen,
  AddBioScreen,
} from "./screens";
import { ContextProvider } from "../../contexts/profileContext";
import { createStackNavigator } from "@react-navigation/stack";
// import { greaterThan } from "react-native-reanimated";

const Tab = createStackNavigator();

function Organizer() {
  return (
    <ContextProvider>
      <Tab.Navigator headerMode="none">
        <Tab.Screen name="Organizer" component={OrganizerScreen} />
        <Tab.Screen name="Add Bio" component={AddBioScreen} />
        <Tab.Screen name="Register Id" component={RegisterScreen} />
        <Tab.Screen name="Add Ideas" component={AddIdeaScreen} />
      </Tab.Navigator>
    </ContextProvider>
  );
}

export default Organizer;
