import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "screens/index";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { WalletScreen } from "screens/index";
import { Calendar } from "containers/MyCalendar";
import { UserProfileScreen } from "screens/organizer/UserProfileScreen";
import { NavigationTabBar } from "components/navBarComponents/navigationTabBar";
import { BrowseScreensStack } from "../stacks/BrowseScreensStack";
import { OrganizerHomeScreenStack } from "stacks/OrganizerHomeScreenStack";
import { appContext } from "contexts/contextApi";
import { getFromEncryptedStorage } from "lib/encryptedStorage";
import { ProfileContext } from "contexts/profileContext";

const NavigationTabs = createBottomTabNavigator<OrganizerTabParamList>();

export const NavigationScreens = () => {
  const { setId, setUsername } = React.useContext(ProfileContext);
  const { accountType, toggleAuth } = appContext();

  React.useEffect(() => {
    (async () => {
      try {
        let jwt = await getFromEncryptedStorage("accessToken");
        toggleAuth(true, jwt.profileType);
        setId(jwt.id);
        setUsername(jwt.username);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <NavigationTabs.Navigator
      //@ts-ignore
      tabBar={(props) => <NavigationTabBar {...props} />}>
      <NavigationTabs.Screen
        name="Home"
        component={
          accountType === "attendee" ? HomeScreen : OrganizerHomeScreenStack
        }
      />
      <NavigationTabs.Screen name="Browse" component={BrowseScreensStack} />
      <NavigationTabs.Screen name="Wallet" component={WalletScreen} />
      <NavigationTabs.Screen name="Availability" component={Calendar} />
      <NavigationTabs.Screen name="Profile" component={UserProfileScreen} />
    </NavigationTabs.Navigator>
  );
};
