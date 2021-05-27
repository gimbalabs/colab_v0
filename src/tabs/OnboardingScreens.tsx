import * as React from "react";
import {
  View,
  Animated,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  CreateAccountScreen,
  InitialScreen,
  OrganizerDetailsScreen,
  PricingScreen,
  WalletSetUpScreen,
} from "screens/onboarding/index";
import PagerView from "react-native-pager-view";
import { ScalingDot } from "react-native-animated-pagination-dots";
import { Colors, Outlines, Sizing } from "styles/index";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const SCREENS = [
  { key: 1, component: <InitialScreen /> },
  { key: 2, component: <PricingScreen /> },
  { key: 3, component: <CreateAccountScreen /> },
  { key: 4, component: <OrganizerDetailsScreen /> },
  { key: 5, component: <WalletSetUpScreen /> },
];

export const OnboardingScreens = () => {
  const screenWidth = Dimensions.get("window").width;
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, SCREENS.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, SCREENS.length * screenWidth],
  });

  // This is only working with useMemo/useCallback
  const onPageScroll = React.useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        { useNativeDriver: false }
      ),
    []
  );

  const renderScreens = ({ key, component }: any) => {
    return <View key={key}>{component}</View>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AnimatedPagerView
        onPageScroll={onPageScroll}
        initialPage={0}
        style={{ flex: 1 }}>
        {SCREENS.map(renderScreens)}
      </AnimatedPagerView>
      <View style={styles.dotContainer}>
        <ScalingDot
          data={SCREENS}
          //@ts-ignore
          scrollX={scrollX}
          inActiveDotColor={Colors.transparent.clear}
          activeDotScale={0.95}
          activeDotColor={Colors.primary.neutral}
          dotStyle={styles.dot}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.s600,
  },
  dotContainer: {},
  dot: {
    borderRadius: Outlines.borderRadius.max,
    borderWidth: Outlines.borderWidth.base,
    borderColor: Colors.primary.brand,
    padding: 8,
  },
});
