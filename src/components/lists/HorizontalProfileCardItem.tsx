import * as React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import profilePic_1 from "assets/images/profilePicTwo.png";
import profilePic_2 from "assets/images/profilePicThree.png";
import profilePic_3 from "assets/images/profilePicFour.png";
import { Sizing, Outlines, Typography, Colors } from "styles/index";

export interface HorizontalProfileCardItemProps {
  item: any;
  navigateTo: any;
}

export const HorizontalProfileCardItem = ({
  item,
  navigateTo,
}: HorizontalProfileCardItemProps) => {
  const randomPlaceholder = React.useCallback(() => {
    var images = [profilePic_1, profilePic_2, profilePic_3];

    return images[Math.floor(Math.random() * images.length)];
  }, [item]);

  const onPress = () => {
    navigateTo({ alias: item.alias });
  };

  return (
    <View style={[styles.container, { backgroundColor: item.backgroundColor }]}>
      <Pressable onPress={onPress} style={styles.cardButton}>
        <View style={styles.header}>
          <ImageBackground
            source={randomPlaceholder()}
            imageStyle={styles.image}
            style={styles.imageView}
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>{item.alias}</Text>
            <Text
              numberOfLines={1}
              lineBreakMode="tail"
              style={styles.headerSubText}>
              {item.occupation}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text
            numberOfLines={5}
            lineBreakMode="tail"
            style={[styles.bodyText, { color: item.bodyColor }]}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 155,
    width: 155,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: Sizing.x12,
    padding: Sizing.x15,
    borderRadius: Outlines.borderRadius.base,
    ...Outlines.shadow.lifted,
  },
  cardButton: {
    flex: 1,
  },
  image: {
    borderRadius: Outlines.borderRadius.max,
  },
  imageView: {
    width: Sizing.x50,
    height: Sizing.x50,
    ...Outlines.shadow.lifted,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    marginLeft: Sizing.x8,
  },
  headerText: {
    ...Typography.header.x10,
    color: Colors.primary.s800,
  },
  headerSubText: {
    ...Typography.subHeader.x5,
  },
  body: {
    marginTop: Sizing.x5,
    alignSelf: "flex-start",
  },
  bodyText: {
    fontSize: Sizing.x12,
    lineHeight: 15,
    fontFamily: "Roboto-Regular",
  },
});
