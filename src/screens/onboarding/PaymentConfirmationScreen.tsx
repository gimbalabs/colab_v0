import * as React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import { CreditCardIcon, PencilAltIcon } from "icons/index";
import { Typography, Colors, Sizing, Outlines, Buttons } from "styles/index";
import { ProfileTag } from "components/profile/profileTag";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { appContext } from "contexts/contextApi";
import { PressableIcon } from "components/buttons/pressableIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface PaymentConfirmationScreenProps {}

const SCREEN_WIDTH = Dimensions.get("screen").width;

const USER_TAGS = [
  { tagName: "Teach", tagBackgroundColor: "#FEF3C7", tagTextColor: "#92400E" },
  { tagName: "Code", tagBackgroundColor: "#E0E7FF", tagTextColor: "#3730A3" },
  {
    tagName: "Innovation",
    tagBackgroundColor: "#FEE2E2",
    tagTextColor: "#92400E",
  },
];

export const PaymentConfirmationScreen = () => {
  const { toggleAuth, ref } = appContext();

  const onChangePress = () => ref.current.setPage(0);

  const onConfirm = () => {};

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      style={{ width: "90%" }}>
      <View style={styles.headerImage}>
        <CreditCardIcon style={styles.image} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Confirm details and make payment</Text>
        <Text style={styles.subHeaderText}>
          You will be able to edit any personal information in your account
          profile if needed.
        </Text>
      </View>
      <View style={styles.userDetails}>
        <PressableIcon
          icon={
            <PencilAltIcon
              stroke={Colors.primary.s350}
              style={styles.userDetailsIcon}
              onPress={onChangePress}
            />
          }
          onPressCallback={onChangePress}
          styles={styles.iconWrapper}
        />
        <Text style={styles.userDetailsHeader}>Profession</Text>
        <Text style={styles.userDetailsText}>Software engineer</Text>
        <Text style={styles.userDetailsHeader}>Job title</Text>
        <Text style={styles.userDetailsText}>Fullstack engineer</Text>
        <Text style={styles.userDetailsHeader}>About yourself</Text>
        <Text style={styles.userDetailsText}>
          Fluent in Java, Javascipt, HTML5 and CSS. Experienced in mentoring
          students, developing and mastering their skills.
        </Text>
        <Text style={styles.userDetailsHeader}>Hourly rate</Text>
        <Text style={styles.userDetailsText}>50 ₳ an hour</Text>
        <Text style={styles.userDetailsHeader}>Skills</Text>
        <View style={styles.skillTags}>
          {USER_TAGS.map((tag, i) => {
            return (
              <View key={i}>
                <ProfileTag tag={tag} key={i} />
              </View>
            );
          })}
        </View>
      </View>
      <FullWidthButton
        onPressCallback={onConfirm}
        colorScheme="dark"
        buttonType="transparent"
        text="Confirm"
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: Sizing.x15,
    alignSelf: "flex-start",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    ...Typography.header.x65,
    color: Colors.primary.neutral,
    marginBottom: Sizing.x5,
  },
  headerImage: {
    width: SCREEN_WIDTH * 0.65,
    height: SCREEN_WIDTH * 0.65,
    marginTop: -Sizing.x20,
    marginBottom: -Sizing.x30,
    marginRight: "auto",
    marginLeft: Sizing.x10,
    alignItems: "flex-end",
  },
  image: {},
  subHeaderText: {
    ...Typography.subHeader.x35,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.neutral,
  },
  userDetails: {
    width: "100%",
    backgroundColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.base,
    padding: Sizing.x20,
  },
  iconWrapper: {
    zIndex: 10,
    position: "absolute",
    right: Sizing.x25,
    top: Sizing.x25,
  },
  userDetailsIcon: {
    zIndex: 9,
    width: Sizing.x30,
    height: Sizing.x30,
  },
  userDetailsHeader: {
    ...Typography.header.x10,
    color: Colors.primary.s600,
    marginTop: Sizing.x2,
    marginBottom: Sizing.x1,
  },
  userDetailsText: {
    ...Typography.body.x10,
    lineHeight: 0,
    color: Colors.primary.s600,
  },
  skillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
