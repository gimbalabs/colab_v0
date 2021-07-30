import * as React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors, Forms, Outlines, Sizing } from "styles/index";
import { DownIcon } from "assets/icons";

export interface TimePickerInputProps {
  label: string;
  placeholder: string;
  styles?: any;
  isLightMode?: boolean;
  onPressHandler?: (arg: string) => void;
}

export const TimePickerInput = (props: TimePickerInputProps) => {
  const [showTimePicker, setShowTimePicker] = React.useState<boolean>(false);
  const [animationValue, setAnimationValue] = React.useState<number>(0);
  var {
    label,
    styles,
    placeholder,
    isLightMode = true,
    onPressHandler,
  }: TimePickerInputProps = props;
  const iconRotation = React.useRef(new Animated.Value(0)).current;

  if (isLightMode) {
    styles = Object.assign({}, defaultStyles, styles, formStyleLight);
  } else {
    styles = Object.assign({}, defaultStyles, styles, formStyleDark);
  }

  React.useEffect(() => {
    const listener = () =>
      iconRotation.addListener(({ value }) => setAnimationValue(value));
    listener();
    // return iconRotation.removeAllListeners;
  }, []);

  const AnimatedIcon = Animated.createAnimatedComponent(DownIcon);

  const spin = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const onInputPress = () => {
    Animated.timing(iconRotation, {
      toValue: animationValue === 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onPressHandler && onPressHandler(label);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Pressable onPress={onInputPress}>
        <View style={styles.textInputWrapper} pointerEvents="none">
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={styles.placeholderText.color}
            editable={false}
          />
          <View style={styles.iconWrapper}>
            <AnimatedIcon
              style={[styles.icon, { transform: [{ rotate: spin }] }]}
              stroke={Colors.primary.s350}
            />
          </View>
        </View>
      </Pressable>
      <View style={[styles.dropDown, { opacity: 1 }]}>
        <DateTimePicker value={new Date()} mode="time" display="spinner" />
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: Sizing.x10,
  },
  labelContainer: {
    width: "100%",
  },
  textInputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    left: -40,
    width: Sizing.x35,
    height: Sizing.x35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: Sizing.x30,
    height: Sizing.x30,
  },
  dropDown: {
    opacity: 0,
    height: 100,
    backgroundColor: Colors.neutral.s300,
  },
});

const formStyleLight = StyleSheet.create({
  label: {
    ...Forms.inputLabel.primary_light,
  },
  input: {
    width: "100%",
    ...Forms.input.primary_light,
    ...Outlines.shadow.lifted,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
});

const formStyleDark = StyleSheet.create({
  label: {
    ...Forms.inputLabel.primary_dark,
  },
  input: {
    width: "100%",
    ...Forms.input.primary_dark,
    ...Outlines.shadow.lifted,
  },
  placeholderText: {
    color: Colors.primary.s300,
  },
});
