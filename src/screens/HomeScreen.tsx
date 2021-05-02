import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Switch,
} from "react-native";
import { AppStackParamList } from "common/types/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { AppContext } from "contexts/appContext";
import { Colors, Buttons, Typography, Sizing } from "styles/index";
// import { SafeAreaView } from "react-native-safe-area-context";

export interface HomeProps
  extends StackScreenProps<AppStackParamList, "Home"> {}

export const HomeScreen = ({ navigation }: HomeProps) => {
  const { state, dispatch } = React.useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <View style={styles.header}>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#37a524" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => dispatch({ type: "TOGGLE_AUTH" })}
            value={state.authentication}
          />
          <Text>{state.authentication ? "AUTH" : "NO-AUTH"}</Text>
        </View>
      </View>
      <Text style={styles.header}>Colab Home Screen</Text>
      <View>
        <Pressable onPress={() => navigation.navigate("Organizer")}>
          <Text>Organizer</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate("Attendees")}>
          <Text>Attendees</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate("Browse")}>
          <Text>Browse</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("My Calendar")}>
          <Text>My Calendar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: Sizing.x30,
    // paddingHorizontal: Sizing.x10,
    // paddingVertical: Sizing.x10,
    // margin: Sizing.x20,
  },
  header: {
    backgroundColor: "yellow",
  },
  headerText: {},
  button: {},
  switch: {
    alignItems: "center",
    flexDirection: "row-reverse",
    alignContent: "center",
  },
});
