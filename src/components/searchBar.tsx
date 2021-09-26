import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  Pressable,
  LayoutRectangle,
  TextInputEndEditingEventData,
  LayoutChangeEvent,
  NativeSyntheticEvent,
} from "react-native";

import { appContext } from "contexts/contextApi";
import { Buttons, Colors, Outlines, Sizing, Typography } from "styles/index";
import { SearchIcon } from "assets/icons";

export interface Props {
  onActiveSearch: (val: boolean) => void;
  onSubmitSearch: (val: string) => void;
  onToggleSearchBar: (val: boolean) => void;
}

export const SearchBar = ({
  onActiveSearch,
  onSubmitSearch,
  onToggleSearchBar,
}: Props) => {
  const { colorScheme } = appContext();
  const [activeSearchBar, setActiveSearchBar] = React.useState<boolean>(false);
  const [inputTextActive, setInputTextActive] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<LayoutRectangle | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const animatedFlex = React.useRef(new Animated.Value(0)).current;
  const animatedRef = React.useRef(new Animated.Value(0)).current;
  const textInputRef = React.useRef(AnimatedTextInput).current;
  const animatedXPosition = animatedRef.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const isLightMode = colorScheme !== "dark";
  // without it react keeps rerendering the component when setting text as state
  const MemoizedAnimatedTextInput = React.useMemo(() => AnimatedTextInput, []);

  const toggleSearchBar = () => {
    startSearchBarAnimation();
  };
  const onSubmit = () => {
    // make an api call with search query
    onSubmitSearch(inputValue);
    (textInputRef as any).current.blur();
    // console.log(textInputRef.current);
  };
  const onChange = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    setInputValue(e.nativeEvent.text);
  };
  const onLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };
  const onFocus = React.useCallback(() => {
    setInputTextActive(true);
    onActiveSearch(true);
  }, []);
  const onBlur = React.useCallback(() => {
    setInputTextActive(false);
    onActiveSearch(false);
  }, []);

  const animateWithValue = (val: any) =>
    Animated.timing(val, {
      useNativeDriver: false,
      duration: 360,
      toValue: activeSearchBar ? 0 : 1,
    });

  const startSearchBarAnimation = () => {
    setActiveSearchBar((prev) => !prev);
    if (activeSearchBar) setInputValue("");
    Animated.parallel([
      animateWithValue(animatedFlex),
      animateWithValue(animatedRef),
    ]).start(({ finished }) => {
      if (finished) {
        onActiveSearch(!activeSearchBar ? true : false);
        (textInputRef as any).current.focus();
        onToggleSearchBar(!activeSearchBar);
        setInputTextActive(!activeSearchBar ? true : false);
      }
    });
  };

  return (
    <View style={styles.searchToolContainer}>
      <SearchIcon
        onPress={toggleSearchBar}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        width={24}
        height={24}
        stroke={
          colorScheme === "light" ? Colors.primary.s800 : Colors.primary.neutral
        }
        strokeWidth={1.8}
        style={{ marginRight: Sizing.x10 }}
      />
      <MemoizedAnimatedTextInput
        style={[
          styles.searchBarInput,
          {
            flex: animatedFlex,
            borderBottomColor: inputTextActive
              ? Colors.primary.s600
              : Colors.neutral.s300,
            opacity: animatedRef,
            marginRight: layout && activeSearchBar ? layout.width + 10 : 0,
          },
        ]}
        value={inputValue}
        onSubmitEditing={onSubmit}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={textInputRef}
      />
      <Animated.View
        style={{
          position: "absolute",
          right: animatedXPosition,
          opacity: animatedRef,
        }}>
        <Pressable
          onLayout={onLayout}
          onPress={onSubmit}
          style={Buttons.applyOpacity([
            styles.searchButton,
            isLightMode
              ? {
                  backgroundColor: Colors.primary.s800,
                }
              : { backgroundColor: Colors.primary.neutral },
          ])}>
          <Text
            style={[
              styles.searchButtonText,
              isLightMode
                ? { color: Colors.primary.neutral }
                : { color: Colors.primary.s800 },
            ]}>
            Search
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchToolContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: Sizing.x5,
    marginTop: Sizing.x10,
  },
  searchBarInput: {
    ...Typography.subHeader.x30,
    fontFamily: "Roboto-Regular",
    color: Colors.primary.s600,
    width: "0%",
    borderBottomWidth: Outlines.borderWidth.base,
    paddingVertical: Sizing.x2,
    paddingHorizontal: 0,
  },
  searchButton: {
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x10,
    ...Outlines.shadow.base,
  },
  searchButtonText: {
    ...Typography.header.x20,
  },
});
