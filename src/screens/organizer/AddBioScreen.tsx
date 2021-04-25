import * as React from "react";

import { Button, View, Text, StyleSheet } from "react-native";
import { ProfileContext } from "contexts/profileContext";
import { OrgCreateProfile } from "components/forms/OrgCreateProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types";

export interface AddBioScreen
  extends StackScreenProps<OrganizerTabParamList, "Add Bio"> {}

export const AddBioScreen = ({ navigation }: AddBioScreen) => {
  // use the state in context
<<<<<<< HEAD
  const { alias, timeBlockLengthMin } = React.useContext(globalContext);
=======
  const { alias, timeBlockLengthMin } = React.useContext(ProfileContext);
>>>>>>> 797d02435c0764f029e8a7901af8874868ce0045

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
