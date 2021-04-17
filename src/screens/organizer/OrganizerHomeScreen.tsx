import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export const OrganizerHomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.primary}>Organizer</Text>
      <Text style={styles.primary}>Cºl⍺b</Text>

      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="1: Register as Organizer"
          onPress={() => navigation.push("Register Id")}
          color="#05269f"
        />
      </View>

      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="2: Add Profile"
          onPress={() => navigation.navigate("Add Bio")}
          color="#05269f"
        />
      </View>

      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="3: Add Ideas"
          onPress={() => navigation.navigate("Add Ideas")}
          color="#05269f"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {
    fontSize: 30,
    margin: 20,
  },
});
