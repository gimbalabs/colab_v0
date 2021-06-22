import * as React from "react";
import { StyleSheet, View } from "react-native";

export interface HorizontalProfileCardItemProps {
  item: any;
}

export const HorizontalProfileCardItem = ({
  item,
}: HorizontalProfileCardItemProps) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
