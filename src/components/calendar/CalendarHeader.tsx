import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";

import { MyCalendarContext } from "contexts/myCalendarContext";
import { Buttons, Colors, Sizing, Outline, Typography } from "styles";
import { SearchIcon } from "icons";

// This will enable LayoutAnimation on Android too.
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const CalendarHeader = () => {
  const { state } = React.useContext(MyCalendarContext);

  const [activeSearch, setActiveSearch] = React.useState<boolean>(false);
  const [nodeTag, setNodeTag] = React.useState<number | null>(null);

  const searchInputRef = React.useRef<TextInput>(null);

  // AnimationRef is used as reference to width value
  // const animatedScale = React.useRef(new Animated.Value(1)).current;

  const handleResponderEvent = (event: any) => {
    event.persist();
    if (nodeTag) {
      if (nodeTag === event.target) {
        return true;
      }
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSearch(false);
    Keyboard.dismiss();
    return true;
  };

  const setChildNodes = (component: any) => {
    if (component && component._children) {
      const childNativeTag = component._children[0]._nativeTag;
      setNodeTag(childNativeTag);
    }
  };

  const handleSearchPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSearch(true);

    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current!.focus();
    }
  };

  const calendarYear = state.calendarHeader ? state.calendarHeader.year : "";

  const calendarMonth = state.calendarHeader ? state.calendarHeader.month : "";

  return (
    <View
      onStartShouldSetResponder={(event) => handleResponderEvent(event)}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{calendarMonth}</Text>
        <Text style={styles.headerText}>{calendarYear}</Text>
      </View>
      <View
        style={styles.searchBarView}
        ref={(component) => setChildNodes(component)}>
        <View style={styles.searchBar}>
          <Pressable
            onPress={handleSearchPress}
            style={[
              styles.searchBarButton,
              { width: activeSearch ? "85%" : "80%" },
            ]}>
            <SearchIcon
              style={styles.searchIcon}
              width={20}
              height={20}
              stroke={Colors.neutral.s600}
            />
            <TextInput
              ref={searchInputRef}
              placeholder={"Search"}
              clearTextOnFocus
              onPressIn={handleSearchPress}
              style={[
                styles.searchBarText,
                { width: activeSearch ? "75%" : "70%" },
              ]}></TextInput>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Sizing.x15,
    height: "10%",
    flexDirection: "row",
  },
  header: {
    width: "50%",
    paddingLeft: Sizing.x40,
    alignSelf: "flex-end",
  },
  headerText: {
    ...Typography.header.x50,
  },
  searchBarView: {
    marginLeft: Sizing.x15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  searchBar: {
    flexDirection: "row-reverse",
    width: "50%",
  },
  searchBarButton: {
    ...Buttons.circular.primary,
    backgroundColor: Colors.neutral.s200,
    width: Sizing.x100,
    height: Sizing.x40,
    flexDirection: "row",
    marginRight: Sizing.x40,
    justifyContent: "flex-start",
  },
  searchAnimated: {
    ...Buttons.circular.primary,
    width: Sizing.x100,
    height: Sizing.x40,
  },
  searchIcon: {
    marginLeft: Sizing.x10,
  },
  searchBarText: {
    marginLeft: Sizing.x5,
    ...Typography.fontSize.x30,
  },
});
