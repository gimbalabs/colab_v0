import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LeftArrowIcon, PlusIcon } from "assets/icons";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { AvailabilityList } from "components/events/availabilityList";
import { PlainInputPicker } from "components/forms/PlainInputPicker";
import { TimePickerInput } from "components/forms/TimePickerInput";
import { HeaderText } from "components/rnWrappers/headerText";
import { appContext, eventCreationContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Buttons, Colors, Forms, Outlines, Sizing } from "styles/index";

export const AvailableTimeSelection = () => {
  const [fromTime, setFromTime] = React.useState<Date>(new Date());
  const [toTime, setToTime] = React.useState<Date>(new Date());
  const [minTime, setMinTime] = React.useState<number>(0);
  const [maxTime, setMaxTime] = React.useState<number>(0);
  const [openPicker, setOpenPicker] = React.useState<string | null>(null);
  const { colorScheme } = appContext();
  const { addAvailability, availabilities } = eventCreationContext();
  const navigation = useNavigation();

  const minInputRange = React.useMemo(() => {
    let arr: number[] = [];
    const range = toTime.getTime() - fromTime.getTime();

    if (range > 0) {
      for (let i = 1; i < range / 1000 / 60 + 1; i++) {
        arr.push(i);
      }
    } else {
      arr = [1];
    }

    return arr;
  }, [fromTime, toTime]);
  const maxInputRange = React.useMemo(() => {
    let arr: number[] = [];
    const range = toTime.getTime() - fromTime.getTime();

    if (range !== 0) {
      for (let i = 1; i < range / 1000 / 60 + 1; i++) {
        arr.push(i);
      }
    } else {
      arr = [1];
    }

    // when minTime is already selected, substract it from maxTime,
    if (minTime) arr.splice(0, minTime - 1);

    return arr;
  }, [fromTime, toTime, minTime]);

  const isLightMode = colorScheme === "light";
  const isDisabledButton = !availabilities.length;
  const isDisabledAddBtn = fromTime === toTime || fromTime > toTime;

  const onTimeChangeValue = (label: string, val: Date) => {
    if (label === "From") setFromTime(val);
    if (label === "To") setToTime(val);
  };
  const onMinValueChange = (val: number) => {
    setMinTime(val);
    // if new min. time slot > max. time slot, reset maxTime
    if (val > maxTime) setMaxTime(val);
  };
  const onMaxValueChange = (val: number) => setMaxTime(val);
  const onOpenChange = (label: string | null) => setOpenPicker(label);
  const addNewAvailability = () => {
    addAvailability({
      from: fromTime,
      to: toTime,
      maxDuration: maxTime,
      minDuration: minTime,
    });
  };

  /**
   * Navigation handlers
   */
  const onBackNavigationPress = () => navigation.goBack();
  // const onNextPress = () => navigation.navigate("Availabilities Creation");
  const onNextPress = () => {};

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
      <View style={{ height: "100%", width: "90%", alignItems: "center" }}>
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
            <TimePickerInput
              onValueChange={onTimeChangeValue}
              timeValue={fromTime}
              label="From"
              openPicker={openPicker}
              onOpenChange={onOpenChange}
            />
          </View>
          <View style={styles.timeInputWrapper}>
            <TimePickerInput
              onValueChange={onTimeChangeValue}
              timeValue={toTime}
              label="To"
              openPicker={openPicker}
              onOpenChange={onOpenChange}
            />
          </View>
        </View>
        <View style={styles.timeSlotsPickersWrapper}>
          <View style={styles.slotsWrapperTop}>
            <PlainInputPicker
              label="Min. time slot"
              minTime={minTime}
              inputRange={minInputRange}
              onValueChange={onMinValueChange}
              openPicker={openPicker}
              onOpenChange={onOpenChange}
            />
          </View>
          <View style={styles.slotsWrapperBottom}>
            <PlainInputPicker
              label="Max. time slot"
              maxTime={maxTime}
              inputRange={maxInputRange}
              onValueChange={onMaxValueChange}
              openPicker={openPicker}
              onOpenChange={onOpenChange}
            />
          </View>
        </View>
        <View style={styles.addBtnWrapper}>
          <Pressable
            onPress={addNewAvailability}
            disabled={isDisabledAddBtn}
            style={Buttons.applyOpacity(
              Object.assign(
                {},
                styles.addBtn,
                isDisabledAddBtn ? { backgroundColor: Colors.neutral.s200 } : {}
              )
            )}>
            <PlusIcon style={styles.plusIcon} strokeWidth={2} />
          </Pressable>
        </View>
        <AvailabilityList />
        <FullWidthButton
          text="Next"
          disabled={isDisabledButton}
          style={{ marginTop: "auto", marginBottom: Sizing.x15 }}
          colorScheme={colorScheme}
          onPressCallback={onNextPress}
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
    marginTop: Sizing.x10,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 5,
  },
  timeInputWrapper: {
    width: "45%",
    flexDirection: "column",
    zIndex: 10,
  },
  timeSlotsPickersWrapper: {
    zIndex: 1,
    width: "100%",
  },
  slotsWrapperTop: {
    zIndex: 6,
  },
  slotsWrapperBottom: {
    zIndex: 5,
  },
  addBtnWrapper: {
    marginVertical: Sizing.x10,
  },
  addBtn: {
    borderRadius: Outlines.borderRadius.max,
    justifyContent: "center",
    width: Sizing.x40,
    height: Sizing.x40,
    backgroundColor: Colors.primary.s200,
    ...Outlines.shadow.lifted,
  },
  plusIcon: {
    width: Sizing.x25,
    height: Sizing.x25,
    alignSelf: "center",
    color: Colors.primary.s600,
  },
});
