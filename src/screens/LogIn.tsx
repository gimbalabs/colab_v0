import * as React from "react";
import { View, StyleSheet } from "react-native";

import * as WebBrowser from "expo-web-browser";
import fetch from "cross-fetch";
import { FullWidthButton } from "components/buttons/fullWidthButton";

// without this the web popup will not close
WebBrowser.maybeCompleteAuthSession();

export interface LogInProps {}

export const LogIn = ({}: LogInProps) => {
  const [isRequesting, setIsRequesting] = React.useState<boolean>(false);
  const [_stateKey, setStateKey] = React.useState<string>("");

  React.useEffect(() => {
    // Android specific, for speeding up prompt message
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const onPress = async () => {
    setIsRequesting(true);
    try {
      const res = await fetch("http://localhost:3000/auth/google/url");
      const { authUrl } = await res.json();
      if (authUrl) {
        await WebBrowser.openAuthSessionAsync(
          authUrl,
          "http://localhost:3000/auth/google"
        );
      }

      setIsRequesting(false);
      return;
    } catch (err) {
      setIsRequesting(false);
      throw new Error(err);
    }
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
        <FullWidthButton
          colorScheme="light"
          text="Do something..."
          onPressCallback={() => {}}
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
