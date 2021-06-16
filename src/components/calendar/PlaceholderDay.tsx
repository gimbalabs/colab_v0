import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "styles/index";

export interface PlaceholderDayProps {
  number: number;
  key: string;
  direction: string;
  onPlaceholderPress: (direction: string) => void;
}

export const PlaceholderDay = ({
  number,
  direction,
  onPlaceholderPress,
}: PlaceholderDayProps) => {
  const onPress = () => {
    onPlaceholderPress(direction);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.placeholderWrapper}>
        <Text style={styles.placeholderNumber}>{number}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  placeholderWrapper: {
    width: 33,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderNumber: {
    ...Typography.body.x30,
    ...Typography.roboto.regular,
    color: Colors.primary.s350,
  },
});
