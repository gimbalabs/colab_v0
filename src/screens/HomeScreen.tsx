import * as React from "react";
import { View, Button, Text, StyleSheet, Switch } from "react-native";
import { AppStackParamList } from "common/types";
import { StackScreenProps } from "@react-navigation/stack";
import { AppContext } from "contexts/appContext";

export interface HomeScreen
  extends StackScreenProps<AppStackParamList, "Home"> {}

export const HomeScreen = ({ navigation }: HomeScreen) => {
  const { state, dispatch } = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: "center" }}>
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#37a524" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => dispatch({ type: "TOGGLE_AUTH" })}
            value={state.authentication}
          />
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 10,
            }}
          >
            {state.authentication ? "AUTH" : "NO-AUTH"}
          </Text>
        </View>
      </View>
      <Text style={styles.header}>Colab Home Screen</Text>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button
          title="Organizers"
          onPress={() => navigation.navigate("Organizer")}
        />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button
          title="Attendees"
          onPress={() => navigation.navigate("Attendees")}
        />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button title="Browse" onPress={() => navigation.navigate("Browse")} />
      </View>
      <View style={{ marginVertical: 10, width: "50%" }}>
        <Button
          title="My Calendar"
          onPress={() => navigation.navigate("My Calendar")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 50,
    fontSize: 28,
    textAlign: "center",
  },
});
