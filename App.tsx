import { LogBox } from "react-native";

// Ignore all log notifications:
LogBox.ignoreAllLogs();

import "react-native-gesture-handler";
import * as React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { HomeScreen } from "screens/index";
import { NavigationScreens } from "tabs/NavigationScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContextProvider } from "contexts/appContext";
import { AppStackParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";

// Error Handlers
import { setJSExceptionHandler } from "react-native-exception-handler";
import { jsErrorHandler } from "lib/errors";
import { OnboardingScreens } from "tabs/OnboardingScreens";
import { LearnMoreModal } from "components/modals/learnMoreModal";

setJSExceptionHandler(jsErrorHandler, true); // true - enables the error in dev mode

const Stack = createStackNavigator<AppStackParamList>();

function App() {
  const { auth } = appContext();

  let [fontsLoadaed] = useFonts({
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });

  if (!fontsLoadaed) {
    return <AppLoading />;
  } else {
    return (
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="screen">
            {auth ? (
              <>
                <Stack.Screen
                  name="Home"
                  options={{ title: "Home" }}
                  component={HomeScreen}
                />
                <Stack.Screen
                  name="Navigation Screens"
                  component={NavigationScreens}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Onboarding Screens"
                  component={OnboardingScreens}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    );
  }
}

export default App;
