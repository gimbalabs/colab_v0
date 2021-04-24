import * as React from "react";

import { Button, View, Text, StyleSheet } from "react-native";
import { globalContext } from "contexts/profileContext";
import { OrgCreateProfile } from "components/forms/OrgCreateProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types";

export interface IAddBioScreen
  extends StackScreenProps<OrganizerTabParamList, "Add Bio"> {}

export const AddBioScreen = ({ navigation }: IAddBioScreen) => {
  // use the state in context
  const { alias, timeBlockLengthMin } = React.useContext(globalContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.primary}>Hello {alias}</Text>
      <Text style={styles.primary}>Create Profile</Text>
      <Text style={styles.detail}>
        Now that you have a registration token, please create your bio here. At
        minimum, you can provide an Alias along with the length (in minutes) and
        cost (in ADA) of your "time blocks".
      </Text>
      <Text>
        Optionally, you can also share links so that people can learn more about
        you.
      </Text>
      <Text>You have {timeBlockLengthMin}</Text>
      <OrgCreateProfile />
      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="Profile"
          color="#05269f"
          onPress={() => {
            navigation.navigate("Register Id");
          }} // currently points back to homescreen
        />
      </View>

      <View style={[{ width: "50%", margin: 10 }]}>
        <Button
          title="Back to Menu"
          onPress={() => navigation.popToTop()}
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
  detail: {
    fontSize: 15,
    margin: 25,
  },
});
