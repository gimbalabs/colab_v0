import * as React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";

import { CheckIcon, LeftArrowIcon } from "assets/icons";
import { appContext, eventCreationContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Outlines, Sizing } from "styles/index";
import { HeaderText } from "components/rnWrappers/headerText";
import { StackScreenProps } from "@react-navigation/stack";
import { EventCreationParamList } from "common/types/navigationTypes";
import { MonthlyWrapper } from "components/calendar";
import { CalendarWrapperSimple } from "components/calendar/CalendarWrapperSimple";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { BodyText } from "components/rnWrappers/bodyText";
import { useGoogleAuth } from "lib/hooks/useGoogleAuth";

type Props = StackScreenProps<
  EventCreationParamList,
  "Available Days Selection"
>;

export const AvailableDaysSelection = ({ navigation }: Props) => {
  const { colorScheme } = appContext();
  const { selectedDays } = eventCreationContext();
  const { isRequesting, isFailed, requestAccess } = useGoogleAuth();
  const [acceptedCheckbox, setAcceptedChecbox] = React.useState<boolean>(false);

  const isLightMode = colorScheme === "light";
  const isDisabledBtn =
    selectedDays === null || !Object.entries(selectedDays).length;
  const onBackNavigationPress = () => navigation.goBack();
  const onNextButtonPress = React.useCallback(async () => {
    try {
      if (acceptedCheckbox) await requestAccess();
      // navigation.navigate("Available Time Selection");
    } catch (e) {
      console.error(e);
    }
  }, [acceptedCheckbox]);
  const onCheckBoxPress = () => {
    setAcceptedChecbox((prev) => !prev);
  };

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
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <View style={{ width: "90%" }}>
          <HeaderText
            customStyles={{ marginBottom: Sizing.x10 }}
            colorScheme={colorScheme}>
            Select dates you are available to host event
          </HeaderText>
        </View>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%", alignItems: "center" }}>
          <CalendarWrapperSimple>
            <MonthlyWrapper isNewEventCalendar />
          </CalendarWrapperSimple>
          <View style={styles.checkboxWrapper}>
            <Pressable
              onPress={onCheckBoxPress}
              hitSlop={5}
              style={[
                styles.checkbox,
                {
                  borderWidth: isLightMode ? Outlines.borderWidth.thin : 0,
                  backgroundColor:
                    isLightMode && acceptedCheckbox
                      ? Colors.primary.s600
                      : Colors.primary.neutral,
                },
              ]}>
              <CheckIcon
                width="15"
                height="15"
                strokeWidth="3.5"
                stroke={
                  isLightMode
                    ? Colors.primary.neutral
                    : !isLightMode && acceptedCheckbox
                    ? Colors.primary.s600
                    : Colors.primary.neutral
                }
              />
            </Pressable>
            <BodyText
              customStyle={{
                fontFamily: "Roboto-Regular",
                fontSize: Sizing.x14,
              }}
              colors={[Colors.primary.s800, Colors.primary.neutral]}>
              I would like to sync with my Google's Calendar schedule to
              automatically prevent unavailable days from being booked (requires
              Google's account permission).
            </BodyText>
          </View>
        </ScrollView>
        <FullWidthButton
          text="Next"
          colorScheme={colorScheme}
          disabled={isDisabledBtn}
          onPressCallback={onNextButtonPress}
          loadingIndicator={isRequesting}
          style={styles.button}
        />
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
  checkboxWrapper: {
    width: "90%",
    flexDirection: "row",
    marginTop: Sizing.x5,
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    width: 17,
    height: 17,
    marginTop: Sizing.x5,
    marginRight: Sizing.x10,
    marginLeft: Sizing.x2,
    borderRadius: Sizing.x3,
  },
  button: { width: "90%", marginTop: "auto", marginBottom: Sizing.x15 },
});
