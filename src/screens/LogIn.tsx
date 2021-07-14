import * as React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

//@ts-ignore
import { GOOGLE_CLIENT_ID } from "@env";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { FullWidthButton } from "components/buttons/fullWidthButton";

// without this the web popup will not close
WebBrowser.maybeCompleteAuthSession();

export interface LogInProps {}

export const LogIn = ({}: LogInProps) => {
  const [isRequesting, setIsRequesting] = React.useState<boolean>(false);
  const [_stateKey, setStateKey] = React.useState<string>("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    redirectUri: "http://localhost:3000/auth",
    responseType: "code",
    extraParams: {
      access_type: "offline",
    },
    expoClientId: GOOGLE_CLIENT_ID,
  });

  React.useEffect(() => {
    // Android specific, for speeding up prompt message
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, [response, request]);

  const onPress = async () => {
    setIsRequesting(true);

    Linking.addEventListener("url", handleUrlLink);

    await promptAsync();
    setIsRequesting(false);
  };

  const handleUrlLink = (e) => {
    const data = Linking.parse(e.url);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <FullWidthButton
          colorScheme="light"
          text="Log In"
          onPressCallback={onPress}
          disabled={isRequesting}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
