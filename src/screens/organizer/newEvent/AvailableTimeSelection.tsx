import * as React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import { DownIcon, LeftArrowIcon } from "assets/icons";
import { appContext, eventCreationContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Forms, Sizing } from "styles/index";
import { HeaderText } from "components/rnWrappers/headerText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { CustomPlainInput } from "components/forms/CustomPlainInput";

export interface AvailableTimeSelectionProps {
  navigation: any;
  route: any;
}

export const AvailableTimeSelection = ({
  navigation,
  route,
}: AvailableTimeSelectionProps) => {
  const [date, setDate] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState<boolean>(false);
  const { colorScheme } = appContext();
  // const { selectedDays } = eventCreationContext();

  const isLightMode = colorScheme === "light";
  const isDisabledButton = (e: boolean) => {
    // console.log(e);
  };
  console.log(showTimePicker);
  const onDateChange = (event, selectedDate) => {
    const currDate = selectedDate || date;
    // setMode(Platform.OS === "ios");
    console.log(event, selectedDate);
    setDate(currDate);
  };

  // navigation handlers
  const onBackNavigationPress = () => navigation.goBack();
  // const onNextPress = () => navigation.navigate("Availabilities Creation");
  const onNextPress = () => {};

  const DropDownIcon = React.memo(DownIcon);

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
      <View style={{ flex: 1, width: "90%", alignItems: "center" }}>
        <View style={styles.navigation}>
          <Pressable onPress={onBackNavigationPress} hitSlop={10}>
            <LeftArrowIcon
              width={24}
              height={24}
              color={isLightMode ? Colors.primary.s600 : Colors.primary.neutral}
            />
          </Pressable>
        </View>
        <HeaderText
          customStyles={{ marginBottom: Sizing.x10 }}
          colorScheme={colorScheme}>
          Select a time you are available
        </HeaderText>
        <View style={styles.timePickersWrapper}>
          <View style={styles.timeInputWrapper}>
            <Text
              style={[isLightMode ? styles.label_light : styles.label_dark]}>
              From
            </Text>
            <DateTimePicker
              style={{ width: "100%", height: 50 }}
              value={new Date()}
              mode="time"
              display="inline"
            />
          </View>
          <View style={styles.timeInputWrapper}>
            <Text
              style={[isLightMode ? styles.label_light : styles.label_dark]}>
              To
            </Text>
            <DateTimePicker
              style={{ width: "100%", height: 50 }}
              value={new Date()}
              mode="time"
              display="inline"
            />
          </View>
        </View>
        <View style={styles.timeSlotsPickersWrapper}>
          <CustomPlainInput
            icon={DropDownIcon}
            placeholder="15 min"
            label="Min. time slot"
          />
          <CustomPlainInput
            icon={DropDownIcon}
            placeholder="15 min"
            label="Min. time slot"
          />
        </View>

        <FullWidthButton
          text="Next"
          colorScheme={colorScheme}
          onPressCallback={() => {}}
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
    alignSelf: "flex-start",
  },
  label_light: {
    ...Forms.inputLabel.primary_light,
  },
  label_dark: {
    ...Forms.inputLabel.primary_dark,
  },
  timePickersWrapper: {
    marginTop: Sizing.x20,
    width: "100%",
    flexDirection: "row",
  },
  timeInputWrapper: {
    width: "50%",
    flexDirection: "column",
  },
  timeSlotsPickersWrapper: {
    width: "100%",
  },
});
