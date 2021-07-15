import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context'
import { ProfileContext } from "contexts/profileContext";
import { OrgCreateProfile } from "components/forms/OrgCreateProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { Colors, Buttons, Typography, Outlines, Sizing } from "styles";

// export interface AddBioProps
//   extends StackScreenProps<OrganizerTabParamList, "Add Bio"> {}

export const AddBioScreen = ({ navigation }: any) => {
  const { alias, timeBlockLengthMin } = React.useContext(ProfileContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {alias}</Text>
        <Text style={styles.headerSubText}>Create Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyInfo}>
          <Text style={styles.bodyInfoText}>
            Now that you have a registration token, please create your bio here.
            At minimum, you can provide an Alias along with the length (in
            minutes) and cost (in ADA) of your "time blocks".
          </Text>
          <Text style={styles.bodyInfoText}>
            Optionally, you can also share links so that people can learn more
            about you.
          </Text>
          {/* <Text style={styles.bodyInfoNote}>You have {timeBlockLengthMin}</Text>*/}
        </View>
        <View style={styles.form}>
          <OrgCreateProfile />
        </View>
        <View style={styles.bottom}>
          <Pressable
            style={Buttons.applyOpacity(styles.button)}
            onPress={() => {
              navigation.navigate("Register Id");
            }}>
            <Text style={styles.buttonText}>Profile</Text>
          </Pressable>
          <Pressable
            style={Buttons.applyOpacity(styles.button)}
            onPress={() => {
              navigation.popToTop();
            }}>
            <Text style={styles.buttonText}>Back to menu</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    alignItems: "center",
    marginVertical: Sizing.x10,
    marginTop: Sizing.x20,
  },
  headerText: {
    ...Typography.header.x60,
  },
  headerSubText: {
    ...Typography.subHeader.x30,
  },
  body: {
    marginTop: Sizing.x20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyInfo: {
    marginHorizontal: Sizing.x15,
  },
  bodyInfoText: {
    ...Typography.body.x20,
  },
  bodyInfoNote: {},
  form: {
    width: "80%",
    marginVertical: "auto",
    marginTop: Sizing.x10,
  },
  button: {
    ...Buttons.bar.transparent,
    width: Sizing.x120,
    marginVertical: Sizing.x15,
  },
  buttonText: {
    ...Buttons.barText.transparent,
  },
  bottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
