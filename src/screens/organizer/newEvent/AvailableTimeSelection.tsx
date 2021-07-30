import * as React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  LayoutRectangle,
} from "react-native";

import { DownIcon, LeftArrowIcon } from "assets/icons";
import { appContext, eventCreationContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Forms, Sizing } from "styles/index";
import { HeaderText } from "components/rnWrappers/headerText";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { TimePickerInput } from "components/forms/TimePickerInput";
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
  // 0 - do not show, 1 - show the first one, 2 - show the second one
  const [fromTime, setFromTime] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );

  const { colorScheme } = appContext();
  // const { selectedDays } = eventCreationContext();

  const isLightMode = colorScheme === "light";
  const isDisabledButton = (e: boolean) => {
    // console.log(e);
  };

  const onDateChange = (event, selectedDate) => {
    const currDate = selectedDate || date;
    // setMode(Platform.OS === "ios");
    setDate(currDate);
  };

  // navigation handlers
  const onBackNavigationPress = () => navigation.goBack();
  // const onNextPress = () => navigation.navigate("Availabilities Creation");
  const onNextPress = () => {};

  const onTimePickerPress = (val: string) => {};

  const DropDownIcon = React.memo(DownIcon);

  const onLayout = (e: LayoutChangeEvent) =>
    setDimensions(e.nativeEvent.layout);

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
          <View style={styles.timeInputWrapper} onLayout={onLayout}>
            <TimePickerInput
              onPressHandler={onTimePickerPress}
              placeholder="8:00 am"
              label="From"
            />
          </View>
          <View style={styles.timeInputWrapper}>
            <TimePickerInput
              onPressHandler={onTimePickerPress}
              placeholder="11:00 am"
              label="To"
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
    justifyContent: "space-between",
    flexDirection: "row",
  },
  timePickerInput: {},
  timePicker: {
    position: "absolute",
    top: 0,
  },
  timeInputWrapper: {
    width: "45%",
    flexDirection: "column",
  },
  timeSlotsPickersWrapper: {
    width: "100%",
  },
});
