import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";

import profilePicThree from "assets/images/profilePicThree.png";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { appContext } from "contexts/contextApi";
import { HearthIcon } from "assets/icons/index";

export interface OrganizerProfileProps {
  profile: any;
}

export const OrganizerProfile = ({ profile }: OrganizerProfileProps) => {
  const {
    colorScheme,
    setFavoriteOrganizer,
    favoriteOrganizers,
  } = appContext();

  const isFavorite =
    profile != null && favoriteOrganizers.includes(profile.alias);
  const isLightMode = colorScheme === "light";

  const onFavoritePress = () => {
    setFavoriteOrganizer(profile.alias);
  };

  return (
    <View style={styles.container}>
      {profile && (
        <View style={styles.mainContainer}>
          <ImageBackground
            source={profilePicThree}
            imageStyle={styles.imageStyle}
            style={styles.imageBackground}
          />
          <View style={styles.rightContainer}>
            <View style={styles.headerContainer}>
              <Text
                style={
                  isLightMode
                    ? styles.headerAlias_light
                    : styles.headerAlias_dark
                }>
                {profile.alias}
              </Text>
              <Text
                style={
                  isLightMode
                    ? styles.headerOccupation_light
                    : styles.headerOccupation_dark
                }>
                {profile.occupation}
              </Text>
            </View>
            <Pressable onPress={onFavoritePress} style={styles.favoriteButton}>
              <HearthIcon
                width={24}
                height={24}
                color="#F87171"
                strokeWidth={2}
                fill={isFavorite ? "#F87171" : "transparent"}
              />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: "auto",
    width: "90%",
    alignItems: "flex-end",
  },
  mainContainer: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    paddingLeft: Sizing.x10,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 999,
  },
  imageBackground: {
    width: Sizing.x85,
    height: Sizing.x85,
    borderRadius: 999,
    ...Outlines.shadow.lifted,
  },
  rightContainer: {
    marginLeft: Sizing.x15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {},
  headerAlias_light: {
    ...Typography.header.x40,
    color: Colors.primary.s800,
  },
  headerAlias_dark: {
    ...Typography.header.x40,
    color: Colors.primary.neutral,
  },
  headerOccupation_light: {
    ...Typography.subHeader.x30,
    lineHeight: 0,
    color: Colors.primary.s600,
  },
  headerOccupation_dark: {
    ...Typography.subHeader.x30,
    lineHeight: 0,
    color: Colors.primary.s600,
  },
  favoriteButton: {
    backgroundColor: "#FEE2E2",
    width: Sizing.x35,
    height: Sizing.x35,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderRadius: Outlines.borderRadius.base,
    ...Outlines.shadow.lifted,
  },
});
