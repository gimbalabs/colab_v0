import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import PagerView from "react-native-pager-view";
import { LiveCollaborationIcon } from "icons/index";
import { LearnMoreModal } from "components/modals/learnMoreModal";
import { Colors, Typography, Buttons, Sizing } from "styles/index";

export interface InitialScreenProps {
  pagerRef: React.RefObject<PagerView>;
}

export const InitialScreen = ({ pagerRef }: InitialScreenProps) => {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);

  const navigateToNextScreen = () => {
    pagerRef.current?.setPage(1);
  };

  const onPressLearnMore = () => {
    setIsVisibleModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <LiveCollaborationIcon width="100%" height="100%" />
      </View>
      <View style={styles.main}>
        <Text style={styles.header}>Lorem ipsum dolor sit amet</Text>
        <View style={styles.subHeaderWrapper}>
          <Text style={styles.subHeader}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            venenatis quam sem, eget bibendum lorem convallis et. Donec velit
            ante, efficitur at ante eu, consequat hendrerit augue. Vivamus quis
            eros ex
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={onPressLearnMore}
          style={Buttons.applyOpacity(styles.buttonTop)}>
          <Text style={styles.buttonTopText}>Learn more</Text>
        </Pressable>
        <Pressable
          onPress={navigateToNextScreen}
          style={Buttons.applyOpacity(styles.buttonBottom)}>
          <Text style={styles.buttonBottomText}>Next</Text>
        </Pressable>
      </View>
      <LearnMoreModal
        setIsVisibleModal={setIsVisibleModal}
        isVisibleModal={isVisibleModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
  },
  imageSection: {
    flex: 2,
  },
  main: {
    flex: 3,
    marginTop: Sizing.x20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    ...Typography.header.x70,
    color: Colors.primary.neutral,
    marginBottom: Sizing.x20,
  },
  subHeader: {
    ...Typography.body.x40,
    color: Colors.primary.neutral,
  },
  subHeaderWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTop: {
    ...Buttons.bar.primary,
  },
  buttonTopText: {
    ...Buttons.barText.primary,
  },
  buttonBottom: {
    ...Buttons.bar.transparent,
  },
  buttonBottomText: {
    ...Buttons.barText.transparent,
  },
});
