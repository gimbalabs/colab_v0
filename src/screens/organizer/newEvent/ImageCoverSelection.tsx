import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LeftArrowIcon } from "assets/icons";
import { HeaderText } from "components/rnWrappers/headerText";
import { appContext } from "contexts/contextApi";
import { Colors, Sizing } from "styles/index";
import { EventCreationParamList } from "common/types/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<EventCreationParamList, "Image Cover Selection">;

export const ImageCoverSelection = ({ route, navigation }: Props) => {
  const { colorScheme } = appContext();

  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => {};

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isLightMode
            ? Colors.primary.neutral
            : Colors.primary.s600,
        },
      ]}>
      <View style={{ height: "100%", width: "90%", alignItems: "center" }}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <HeaderText
          customStyles={{ marginBottom: Sizing.x10 }}
          colorScheme={colorScheme}>
          Select a time you are available
        </HeaderText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  navigation: {
    marginVertical: Sizing.x15,
    alignSelf: "flex-start",
  },
});
