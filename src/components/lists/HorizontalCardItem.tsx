import * as React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Sizing } from "styles/index";

export interface HorizontalCardItemProps {
  item: any;
}

export const HorizontalCardItem = ({ item }: HorizontalCardItemProps) => {
  console.log(item);
  return (
    <ImageBackground
      imageStyle={styles.backgroundImage}
      source={item.backgroundImage}
      style={styles.container}>
      <Text style={styles.innerText}>{item.title}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Sizing.x50,
    width: Sizing.x50,
    backgroundColor: "green",
  },
  backgroundImage: {},
  innerText: {},
});
