import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { applyOpacity } from "../../styles/colors";
import { Colors, Outlines, Sizing, Typography } from "styles/index";
import { getEventCardDate } from "lib/utils";
import { LeftArrowIcon } from "assets/icons";
import { appContext } from "contexts/contextApi";
import { BodyText } from "components/rnWrappers/bodyText";
import { FullWidthButton } from "components/buttons/fullWidthButton";

export interface EventDescriptionProps {
  navigation: any;
  route: any;
}

function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export const EventDescription = ({
  navigation,
  route,
}: EventDescriptionProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { title, description, fromDate, toDate, image, color } = route.params;
  const { colorScheme } = appContext();

  const insets = useSafeAreaInsets();
  const isLightMode = colorScheme === "light";

  const onBackNavigationPress = () => navigation.goBack();
  const onBookEventPress = async () => {
    setIsLoading(true);
    await wait(1000);
    //@TODO here we should make an API call to obtain availabilities,
    //      and pass selected event (id?) as navigation prop
    navigation.navigate("Available Dates", { selectedEvent: "test" });
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <View style={styles.topContainer}>
        <ImageBackground
          resizeMode="cover"
          source={image}
          style={styles.backgroundImage}>
          <View
            style={[
              styles.topInnerContainer,
              { backgroundColor: applyOpacity(color, 0.5) },
            ]}>
            <View style={[styles.topInnerWrapper, { paddingTop: insets.top }]}>
              <View style={styles.navigation}>
                <Pressable onPress={onBackNavigationPress} hitSlop={10}>
                  <LeftArrowIcon
                    width={24}
                    height={24}
                    color={Colors.primary.neutral}
                  />
                </Pressable>
              </View>
              <View
                style={[
                  styles.dateCard,
                  { backgroundColor: applyOpacity(color, 0.8) },
                ]}>
                <Text style={styles.dateCardText}>
                  {getEventCardDate(fromDate, toDate)}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.eventTitleWrapper,
                { paddingBottom: insets.bottom + Sizing.x15 },
              ]}>
              <Text style={styles.eventTitle}>{title}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={[
          styles.bottomContainer,
          {
            backgroundColor: isLightMode
              ? Colors.primary.neutral
              : Colors.primary.s800,
          },
        ]}>
        <View style={styles.bottomWrapper}>
          <BodyText colors={[Colors.primary.s800, Colors.primary.neutral]}>
            {description}
          </BodyText>
          <FullWidthButton
            onPressCallback={onBookEventPress}
            text="Book event"
            colorScheme={colorScheme}
            loadingIndicator={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomWrapper: {
    flex: 1,
    width: "90%",
    paddingVertical: Sizing.x20,
    justifyContent: "space-between",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  topInnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topInnerWrapper: {
    width: "90%",
    flexDirection: "row",
  },
  navigation: {
    marginBottom: "auto",
    marginTop: Sizing.x15,
  },
  dateCard: {
    maxWidth: Sizing.x80,
    height: "auto",
    marginLeft: "auto",
    marginTop: Sizing.x15,
    borderRadius: Outlines.borderRadius.small,
    ...Outlines.shadow.lifted,
  },
  dateCardText: {
    textAlign: "center",
    padding: Sizing.x5,
    ...Typography.header.x45,
    color: Colors.primary.neutral,
  },
  eventTitleWrapper: {
    width: "90%",
  },
  eventTitle: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    marginTop: "auto",
    ...Typography.header.x60,
    color: Colors.primary.neutral,
  },
});
