import * as React from "react";

import {
  CreateAccountScreen,
  InitialScreen,
  OrganizerDetailsScreen,
  PricingScreen,
  WalletSetUpScreen,
} from "screens/onboarding/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AppContextProvider } from "contexts/appContext";
import { OnboardingPager } from "components/OnboardingPager";
import PagerView from "react-native-pager-view";
import { View } from "react-native";

const OnboardingTabs = createMaterialTopTabNavigator();

export const OnboardingScreens = () => {
  return (
    <PagerView showPageIndicator style={{ flex: 1 }}>
      <View key="1">
        <InitialScreen />
      </View>
      <View key="2">
        <PricingScreen />
      </View>
      <View key="3">
        <CreateAccountScreen />
      </View>
      <View key="4">
        <OrganizerDetailsScreen />
      </View>
      <View key="5">
        <WalletSetUpScreen />
      </View>
    </PagerView>
  );
  // return (
  //   <AppContextProvider>
  //     <OnboardingTabs.Navigator
  //       tabBarPosition="bottom"
  //       initialRouteName="Initial"
  //       tabBar={(props) => <OnboardingPager {...props} />}>
  //       <OnboardingTabs.Screen name="Intitial" component={InitialScreen} />
  //       <OnboardingTabs.Screen name="Pricing" component={PricingScreen} />
  //       <OnboardingTabs.Screen
  //         name="Create Account"
  //         component={CreateAccountScreen}
  //       />
  //       <OnboardingTabs.Screen
  //         name="Organizer Details"
  //         component={OrganizerDetailsScreen}
  //       />
  //       <OnboardingTabs.Screen
  //         name="Wallet Setup"
  //         component={WalletSetUpScreen}
  //       />
  //     </OnboardingTabs.Navigator>
  //   </AppContextProvider>
  // );
};
