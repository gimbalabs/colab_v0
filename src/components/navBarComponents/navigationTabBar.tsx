import * as React from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";

import {
  CalendarIcon,
  SearchIcon,
  HomeIcon,
  UserIcon,
  WalletIcon,
} from "icons/index";
import { Colors, Typography, Outlines } from "styles/index";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

type NavigationTabBarProps = BottomTabBarProps<OrganizerTabParamList>;

export const NavigationTabBar = ({
  state,
  descriptors,
  navigation,
}: NavigationTabBarProps) => {
  const getNavBarIcon = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return HomeIcon;
      case "Browse":
        return SearchIcon;
      case "Wallet":
        return WalletIcon;
      case "Availability":
        return CalendarIcon;
      case "Profile":
        return UserIcon;
      default:
        throw Error("Route name not supported");
    }
  };

  const label = (options: any, route: any) => {
    return options.tabBarLabel != null
      ? options.tabBarLable
      : options.title != null
      ? options.title
      : route.name;
  };

  const renderTabItem = (route: any, index: any) => {
    const { options } = descriptors[route.key];

    const isFocused = state.index === index;
    const Icon = getNavBarIcon(route.name);

    const onPress = () => {
      if (route.key != null) {
        //@ts-ignore
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <View style={styles.navBarButtonWrapper} key={index}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          key={route.key}
          style={[
            styles.navBarButton,
            {
              backgroundColor: isFocused
                ? Colors.primary.neutral
                : Colors.primary.brand,
            },
            isFocused ? { ...Outlines.shadow.lifted } : {},
          ]}>
          <Icon
            width={24}
            height={24}
            stroke={isFocused ? Colors.primary.s600 : Colors.primary.neutral}
          />
        </Pressable>
        <Text style={styles.navBarButtonLabel}>{label(options, route)}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map(renderTabItem)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: Outlines.borderWidth.thin,
    borderTopColor: Colors.primary.brand,
    backgroundColor: Colors.primary.s600,
  },
  navBarButtonWrapper: {
    flex: 1,
    alignItems: "center",
    marginVertical: 5,
  },
  navBarButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: Outlines.borderWidth.thin,
    borderColor: Colors.primary.brand,
    borderRadius: 10,
    width: 44,
    height: 44,
    margin: 5,
  },
  navBarButtonLabel: {
    color: Colors.primary.neutral,
    ...Typography.subHeader.x5,
  },
});
