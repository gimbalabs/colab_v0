import * as React from "react";
import { View, StyleSheet, Pressable, Switch } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { EventCreationParamList } from "common/types/navigationTypes";
import { appContext, eventCreationContext } from "contexts/contextApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Sizing, Outlines, Typography } from "styles/index";
import { LeftArrowIcon } from "assets/icons";
import { HeaderText } from "components/rnWrappers/headerText";
import { SubHeaderText } from "components/rnWrappers/subHeaderText";
import { EventsListCard } from "components/booking/EventsListCard";
import {
  SliderHuePicker,
  SliderSaturationPicker,
  SliderValuePicker,
} from "react-native-slider-color-picker";
import tinyColor from "tinycolor2";
import { FullWidthButton } from "components/buttons/fullWidthButton";
import { BodyText } from "components/rnWrappers/bodyText";

type Props = StackScreenProps<
  EventCreationParamList,
  "Event Card Customization"
>;

export const EventCardCustomization = ({ navigation }: Props) => {
  const {
    textContent,
    imageURI,
    selectedDays,
    setEventCardColor,
    eventCardColor,
  } = eventCreationContext();
  const { colorScheme } = appContext();
  const [color, setColor] = React.useState<string>("#030303");
  const [transparent, setTransparent] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (eventCardColor) setColor(eventCardColor);
  }, []);

  const selectedDaysArr: number[] = Object.values(selectedDays as any);
  const fromDate = Math.min(...selectedDaysArr);
  const toDate = Math.max(...selectedDaysArr);

  const isLightMode = colorScheme !== "dark";
  const onColorChange = (colorHsvOrRgb: string, resType: any) => {
    if (resType === "end") setColor(tinyColor(colorHsvOrRgb).toHexString());
  };

  const onBackNavigationPress = () => navigation.goBack();
  const onNextPress = () => {
    setEventCardColor(color);
    navigation.navigate("Event Confirmation Details", {
      isNewEvent: true,
    });
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
            Customize your event card
          </HeaderText>
          <SubHeaderText colors={[Colors.primary.s800, Colors.primary.neutral]}>
            Give your card some color to organize your events ex. by time, theme
            or to simply bring aesthetics to your events.
          </SubHeaderText>
        </View>
        <View style={styles.colorPickerWrapper}>
          <SliderHuePicker
            oldColor={color}
            trackStyle={[{ height: Sizing.x10, width: "100%" }]}
            thumbStyle={styles.thumb}
            useNativeDriver={true}
            onColorChange={onColorChange}
          />
        </View>
        <View style={styles.colorPickerWrapper}>
          <SliderSaturationPicker
            oldColor={color}
            trackStyle={[{ height: Sizing.x10, width: "100%" }]}
            thumbStyle={styles.thumb}
            useNativeDriver={true}
            onColorChange={onColorChange}
            style={[
              styles.colorPicker,
              {
                backgroundColor: tinyColor({
                  h: tinyColor(color).toHsv().h,
                  s: 1,
                  v: 1,
                }).toHexString(),
              },
            ]}
          />
        </View>
        <View style={styles.colorPickerWrapper}>
          <SliderValuePicker
            oldColor={color}
            minumumValue={0.2}
            step={0.05}
            trackStyle={[{ height: Sizing.x10, width: "100%" }]}
            thumbStyle={styles.thumb}
            useNativeDriver={true}
            onColorChange={onColorChange}
            trackImage={require("react-native-slider-color-picker/brightness_mask.png")}
            style={[
              styles.colorPicker,
              {
                backgroundColor: "black",
              },
            ]}
          />
        </View>
        <View style={styles.enableColorsWrapper}>
          <Switch
            trackColor={{
              false: Colors.neutral.s200,
              true: Colors.neutral.s800,
            }}
            thumbColor={
              !isLightMode ? Colors.primary.s600 : Colors.primary.neutral
            }
            ios_backgroundColor={Colors.primary.brand}
            onValueChange={() => setTransparent((prev) => !prev)}
            value={!transparent}
            style={{ marginLeft: "auto" }}
          />
          <BodyText
            customStyle={{ ...Typography.roboto.medium }}
            colors={[Colors.primary.s800, Colors.primary.neutral]}>
            Colors {!transparent ? "enabled" : "disabled"}
          </BodyText>
        </View>
        <View style={styles.main}>
          <EventsListCard
            isEventCardPreview={true}
            title={textContent.title}
            description={textContent.description}
            fromDate={fromDate}
            toDate={toDate}
            image={imageURI}
            color={color}
            isTransparent={transparent}
          />
        </View>
        <FullWidthButton
          text="Next"
          disabled={false}
          style={{ width: "90%", marginTop: "auto", marginBottom: Sizing.x15 }}
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
    alignSelf: "center",
    width: "90%",
  },
  header: {
    alignSelf: "center",
    width: "90%",
    marginBottom: Sizing.x15,
  },
  subHeader: {
    alignSelf: "center",
    width: "90%",
    marginTop: Sizing.x5,
  },
  main: {
    width: "90%",
  },
  currentColor: {
    width: 80,
    height: 40,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "white",
  },
  colorPickerWrapper: {
    height: Sizing.x30,
    width: "90%",
    marginTop: Sizing.x5,
  },
  colorPicker: {
    height: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  enableColorsWrapper: {
    marginVertical: Sizing.x5,
    marginLeft: Sizing.x25,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
});
