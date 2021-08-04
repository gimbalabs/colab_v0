import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Buttons, Outlines, Typography, Sizing, Colors } from "styles/index";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import {
  CogIcon,
  HearthIcon,
  LightBulbIcon,
  RightArrowIcon,
} from "icons/index";
import * as ImagePicker from "expo-image-picker";
import { MediaTypeOptions } from "expo-image-picker";

// image only for testing purposes
//@ts-ignore
import ProfilePic from "assets/images/profilePic.jpg";

export interface OrganizerProfileScreenProps
  extends StackScreenProps<OrganizerTabParamList, "Browse"> {}

export const OrganizerProfileScreen = ({
  navigation,
}: OrganizerProfileScreenProps) => {
  const { colorScheme, setColorScheme } = appContext();
  const [imagePressed, setImagePressed] = React.useState<boolean>(false);
  const [currImage, setCurrImage] = React.useState<string>("");
  const darkMode = colorScheme === "dark";

  const setDarkMode = () => {
    setColorScheme(darkMode ? "light" : "dark");
  };

  /**
   * in production we want to check for access to camera and media library
   * and if it's not yet granted, try to get the permission from user
   */
  const onImageLongPress = async () => {
    // don't run it on the browser
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("We need camera roll permission for this to work!");
      }

      // the access was granted, let user choose the image
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        mediaTypes: MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });

      if (!result.cancelled) setCurrImage(result.uri);
    }
  };

  const onImagePress = () => setImagePressed(true);

  const onImagePressOut = () => setImagePressed(false);

  return (
    <SafeAreaView
      style={[
        colorScheme == "light" ? styles.safeArea_light : styles.safeaArea_dark,
      ]}>
      <View style={styles.headerNavigation}>
        <ImageBackground
          // only for testing purpose render uri conditionally
          source={currImage ? { uri: currImage } : ProfilePic}
          imageStyle={styles.profilePicImage}
          style={styles.profilePic}>
          <Pressable
            onPressIn={onImagePress}
            onPressOut={onImagePressOut}
            onLongPress={onImageLongPress}
            hitSlop={5}
            pressRetentionOffset={5}
            style={[
              styles.profilePicWrapper,
              imagePressed ? { backgroundColor: "rgba(0,0,0,0.15)" } : {},
            ]}></Pressable>
        </ImageBackground>
        <Text
          style={[
            colorScheme == "light"
              ? styles.headerText_ligth
              : styles.headerText_dark,
          ]}>
          DocOcatavius.md
        </Text>
        <Pressable
          style={
            colorScheme === "light" ? styles.button_light : styles.button_dark
          }
          onPress={() => {}}>
          <Text
            style={
              colorScheme === "light"
                ? styles.buttonText_light
                : styles.buttonText_dark
            }>
            Edit Profile
          </Text>
        </Pressable>
      </View>
      <View style={styles.mainNavigation}>
        <Pressable style={styles.navigationItem} onPress={() => {}}>
          <HearthIcon
            width={26}
            height={26}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
            strokeWidth={1.6}
          />
          <Text
            style={
              colorScheme === "light"
                ? styles.navigationItemText_light
                : styles.navigationItemText_dark
            }>
            Favorites
          </Text>
          <RightArrowIcon
            width={26}
            height={26}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
            style={styles.navigationItemRightIcon}
            strokeWidth={1.6}
          />
        </Pressable>
        <Pressable style={styles.navigationItem} onPress={() => {}}>
          <CogIcon
            width={26}
            height={26}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
            strokeWidth={1.6}
          />
          <Text
            style={
              colorScheme === "light"
                ? styles.navigationItemText_light
                : styles.navigationItemText_dark
            }>
            Settings
          </Text>
          <RightArrowIcon
            width={26}
            height={26}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
            style={styles.navigationItemRightIcon}
            strokeWidth={1.6}
          />
        </Pressable>
        <View style={[styles.navigationItem, { marginTop: "auto" }]}>
          <LightBulbIcon
            width={26}
            height={26}
            color={
              colorScheme === "light"
                ? Colors.primary.brand
                : Colors.primary.neutral
            }
            strokeWidth={1.6}
          />
          <Text
            style={
              colorScheme === "light"
                ? styles.navigationItemText_light
                : styles.navigationItemText_dark
            }>
            Dark mode
          </Text>
          <Switch
            trackColor={{
              false: Colors.primary.brand,
              true: Colors.primary.neutral,
            }}
            thumbColor={darkMode ? Colors.primary.s600 : Colors.primary.neutral}
            ios_backgroundColor={Colors.primary.brand}
            onValueChange={setDarkMode}
            value={darkMode}
            style={{ marginLeft: "auto" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  safeaArea_dark: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
    alignItems: "center",
  },
  headerNavigation: {
    alignItems: "center",
    marginVertical: Sizing.x30,
  },
  headerText_ligth: {
    ...Typography.header.x45,
    color: Colors.primary.s600,
    marginVertical: Sizing.x5,
  },
  headerText_dark: {
    ...Typography.header.x45,
    color: Colors.primary.neutral,
    marginVertical: Sizing.x5,
  },
  mainNavigation: {
    flex: 1,
    alignItems: "center",
    marginTop: Sizing.x10,
    width: "100%",
  },
  button_light: {
    ...Buttons.bar.secondary,
    padding: Sizing.x8,
    backgroundColor: Colors.primary.s800,
    ...Outlines.shadow.lifted_noElevation,
  },
  button_dark: {
    ...Buttons.bar.secondary,
    padding: Sizing.x8,
    backgroundColor: Colors.primary.neutral,
    ...Outlines.shadow.lifted_noElevation,
  },
  buttonText_light: {
    ...Typography.header.x30,
    lineHeight: 0,
    paddingHorizontal: Sizing.x2,
    textAlign: "center",
    color: Colors.primary.neutral,
  },
  buttonText_dark: {
    ...Typography.header.x30,
    lineHeight: 0,
    paddingHorizontal: Sizing.x2,
    textAlign: "center",
    color: Colors.primary.s600,
  },
  profilePicWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    ...Outlines.shadow.lifted_noElevation,
    marginBottom: Sizing.x10,
  },
  profilePicImage: {
    borderRadius: 999,
    resizeMode: "cover",
  },
  profilePic: {
    borderRadius: Outlines.borderRadius.max,
    width: Sizing.x85,
    height: Sizing.x85,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: Sizing.x20,
  },
  navigationItemRightIcon: {
    marginLeft: "auto",
  },
  navigationItemText_light: {
    ...Typography.subHeader.x35,
    marginLeft: Sizing.x10,
    color: Colors.primary.s600,
  },
  navigationItemText_dark: {
    ...Typography.subHeader.x35,
    marginLeft: Sizing.x10,
    color: Colors.primary.neutral,
  },
});
