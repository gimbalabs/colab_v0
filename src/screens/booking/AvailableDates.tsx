import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";

import { Colors, Sizing } from "styles/index";
import { OrganizerProfile } from "components/booking/index";
import { LeftArrowIcon } from "icons/index";
import { appContext } from "contexts/contextApi";

import { featuredOrganizers } from "../../api_data/featuredOrganizers";

export interface AvailableDatesProps {}

export const AvailableDates = ({ navigation, route }) => {
  const [profile, setProfile] = React.useState<any>(null);
  const { colorScheme } = appContext();
  const { alias } = route.params;

  React.useEffect(() => {
    let profile = featuredOrganizers.items.find((org) => org.alias === alias);

    setProfile(profile);
  }, []);

  const onPress = () => navigation.goBack();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            colorScheme === "light"
              ? Colors.primary.neutral
              : Colors.primary.s600,
        },
      ]}>
      <View style={styles.navigation}>
        <Pressable onPress={onPress}>
          <LeftArrowIcon width={24} height={24} color={Colors.primary.s600} />
        </Pressable>
      </View>
      <OrganizerProfile profile={profile} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  navigation: {
    flexDirection: "row",
    width: "90%",
    marginVertical: Sizing.x15,
  },
});
