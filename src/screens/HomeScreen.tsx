import * as React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { AppStackParamList } from "common/types";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
