import * as React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import PagerView from "react-native-pager-view";
import { CheckIcon } from "icons/index";
import { Colors, Sizing, Typography, Outlines, Buttons } from "styles/index";
import { FullWidthButton } from "components/buttons/fullWidthButton";

export interface PricingScreenProps {
  pagerRef: React.RefObject<PagerView>;
}

export interface Benefit {
  text: string;
}
const ATTENDEE_BENEFITS: Benefit[] = [
  { text: "Vestibulum venenatis quam" },
  { text: "Sapiente libero doloribus modi" },
  { text: "Itaque cupiditate adipisci quibusdam" },
  { text: "Vel ipsa esse repudiandae excepturi" },
];

const ORGANIZER_BENEFITS: Benefit[] = [
  { text: "Vestibulum venenatis quam" },
  { text: "Sapiente libero doloribus modi" },
  { text: "Itaque cupiditate adipisci quibusdam" },
  { text: "Vel ipsa esse repudiandae excepturi" },
];

export const PricingScreen = ({ pagerRef }: PricingScreenProps) => {
  const renderCheckBoxes = (val: Benefit, i: number) => {
    return (
      <View key={i} style={styles.checkBox}>
        <CheckIcon width={20} height={20} stroke={Colors.neutral.s500} />
        <Text style={styles.checkBoxText}>{val.text}</Text>
      </View>
    );
  };

  const onAttendeePress = () => {
    pagerRef.current?.setPage(2);
  };
  const onOrganizerPress = () => {
    pagerRef.current?.setPage(2);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={[styles.section, { marginBottom: Sizing.x40 }]}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Attendee</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderPrice}>1 ₳</Text>
              <Text style={styles.cardHeaderText}>one time fee</Text>
            </View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <View style={styles.checkBoxes}>
              {ATTENDEE_BENEFITS.map(renderCheckBoxes)}
            </View>
          </View>
          <FullWidthButton
            colorScheme="dark"
            onPressCallback={onAttendeePress}
            text="Sign up as attendee"
            buttonType="transparent"
          />
        </View>
        <View style={[styles.section, { marginBottom: Sizing.x20 }]}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Organizer</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderPrice}>2 ₳</Text>
              <Text style={styles.cardHeaderText}>/mo</Text>
            </View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <View style={styles.checkBoxes}>
              {ORGANIZER_BENEFITS.map(renderCheckBoxes)}
            </View>
          </View>
          <FullWidthButton
            colorScheme="dark"
            onPressCallback={onOrganizerPress}
            text="Sign up as organizer"
            buttonType="transparent"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    height: "100%",
    marginTop: Sizing.x20,
  },
  container: {
    width: "90%",
    justifyContent: "space-between",
  },
  section: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary.s200,
    borderRadius: Outlines.borderRadius.large,
  },
  labelText: {
    ...Typography.subHeader.x30,
    lineHeight: Sizing.x25,
    fontFamily: "Roboto-Bold",
    color: Colors.primary.s600,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizing.x14,
    padding: Sizing.x25,
    backgroundColor: Colors.primary.neutral,
    borderRadius: Outlines.borderRadius.large,
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  cardHeaderPrice: {
    ...Typography.header.x70,
    fontFamily: "Roboto-Medium",
    lineHeight: 0,
    letterSpacing: -1,
    color: Colors.primary.s800,
  },
  cardHeaderText: {
    ...Typography.header.x35,
    fontFamily: "Roboto-Regular",
    lineHeight: 0,
    color: Colors.neutral.s500,
    letterSpacing: -1,
    marginLeft: Sizing.x5,
  },
  subHeader: {
    width: "100%",
  },
  subHeaderText: {
    ...Typography.body.x30,
  },
  checkBoxes: {
    width: "95%",
    alignItems: "center",
    marginTop: Sizing.x10,
  },
  checkBox: {
    width: "100%",
    flexDirection: "row",
    marginTop: Sizing.x3,
  },
  checkBoxText: {
    ...Typography.body.x20,
    marginLeft: Sizing.x10,
  },
});
