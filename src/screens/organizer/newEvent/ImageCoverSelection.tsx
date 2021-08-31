import * as React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  LayoutChangeEvent,
} from "react-native";

import Image from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraIcon, LeftArrowIcon, PlaceholderIcon } from "assets/icons";
import { HeaderText } from "components/rnWrappers/headerText";
import { appContext } from "contexts/contextApi";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { EventCreationParamList } from "common/types/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { SubHeaderText } from "components/rnWrappers/subHeaderText";
import { useMediaLibraryAccess } from "lib/hooks/useMediaAccess";
import { useCameraAccess } from "lib/hooks/useCameraAccess";

type Props = StackScreenProps<EventCreationParamList, "Image Cover Selection">;

export const ImageCoverSelection = ({ route, navigation }: Props) => {
  const [layout, setLayout] = React.useState<any>(null);
  const { launchImageLibrary, mediaObj } = useMediaLibraryAccess();
  const { launchCamera, imageObj } = useCameraAccess();
  const { colorScheme } = appContext();

  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => {};
  const onLayout = (e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isLightMode
            ? Colors.primary.neutral
            : Colors.primary.s600,
        },
      ]}>
      <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <View style={styles.header}>
          <HeaderText
            customStyles={{ marginBottom: Sizing.x10 }}
            colorScheme={colorScheme}>
            Select a cover image
          </HeaderText>
          <SubHeaderText colors={[Colors.primary.s800, Colors.primary.neutral]}>
            Upload a cover image to draw attention to your event card.
          </SubHeaderText>
        </View>
        <View style={styles.main}>
          <View
            style={[
              styles.imagePreview,
              { paddingBottom: layout ? layout.height : 0 },
            ]}>
            {!mediaObj && !imageObj ? (
              <View style={styles.imagePreview_inner}>
                <PlaceholderIcon
                  width={Sizing.x80}
                  height={Sizing.x80}
                  strokeWidth={1}
                  stroke={Colors.neutral.s100}
                />
              </View>
            ) : (
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: imageObj?.uri ?? mediaObj?.uri,
                  priority: Image.priority.normal,
                }}
                resizeMode={Image.resizeMode.contain}
              />
            )}
          </View>
          <View
            onLayout={onLayout}
            style={[
              styles.main_navigation,
              {
                backgroundColor: isLightMode
                  ? Colors.primary.neutral
                  : Colors.primary.s800,
              },
            ]}>
            <Pressable
              style={styles.main_navigation_button}
              onPress={launchImageLibrary}>
              <Text style={styles.button_text}>Gallery</Text>
              <PlaceholderIcon
                width={Sizing.x30}
                height={Sizing.x30}
                strokeWidth={1.5}
                stroke={Colors.primary.s800}
              />
            </Pressable>
            <Pressable
              style={styles.main_navigation_button}
              onPress={launchCamera}>
              <Text style={styles.button_text}>Take photo</Text>
              <CameraIcon
                width={Sizing.x30}
                height={Sizing.x30}
                strokeWidth={1.5}
                stroke={Colors.primary.s800}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  navigation: {
    marginVertical: Sizing.x15,
    alignSelf: "center",
    width: "90%",
  },
  header: {
    alignSelf: "center",
    width: "90%",
    marginBottom: Sizing.x15,
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: Colors.applyOpacity("#0F4871", 0.5),
    borderTopLeftRadius: Outlines.borderRadius.large,
    borderTopRightRadius: Outlines.borderRadius.large,
  },
  imagePreview_inner: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    height: "90%",
    borderColor: Colors.neutral.s100,
    borderWidth: Sizing.x5,
    borderRadius: 10,
    borderStyle: "dashed",
  },
  main_navigation: {
    position: "absolute",
    bottom: 0,
    height: Sizing.x110,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopLeftRadius: Outlines.borderRadius.large,
    borderTopRightRadius: Outlines.borderRadius.large,
  },
  main_navigation_button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    paddingVertical: Sizing.x8,
    backgroundColor: Colors.primary.s400,
    borderWidth: Outlines.borderWidth.thin,
    borderColor: Colors.primary.s800,
    borderRadius: Outlines.borderRadius.small,
    ...Outlines.shadow.base,
  },
  button_text: {
    ...Typography.subHeader.x30,
    color: Colors.primary.s800,
    marginRight: Sizing.x2,
  },
});
