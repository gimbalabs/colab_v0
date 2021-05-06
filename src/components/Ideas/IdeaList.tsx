import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography, Sizing } from "styles";

export const IdeaList = ({ item }: any) => {
  return (
    <View style={styles.ideaItem}>
      <Text style={styles.ideaText}>{item.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ideaItem: {
    width: "80%",
  },
  ideaText: {},
});
