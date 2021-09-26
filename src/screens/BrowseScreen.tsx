import * as React from "react";
import { View, StyleSheet, ActivityIndicator, Animated } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors, Sizing } from "styles/index";
import { BookingStackParamList } from "common/types/navigationTypes";
import { appContext } from "contexts/contextApi";
import { useEventsPagination } from "lib/hooks/useEventsPagination";
import { EventsList } from "components/booking/EventsList";
import { SubHeaderText } from "components/rnWrappers/subHeaderText";
import { applyOpacity } from "../styles/colors";
import { SearchBar } from "components/searchBar";
import { useEventsResults } from "lib/hooks/useEventsResults";
import { EmptyDocumentsIcon } from "assets/icons";
// import { browseFeatured } from "../api_data/browseFeatured";

export interface BrowseProps
  extends StackScreenProps<BookingStackParamList, "Browse"> {
  children: React.ReactNode;
}

export const BrowseScreen = ({ navigation }: BrowseProps) => {
  const { colorScheme } = appContext();
  const { events, isLoading: isPaginationLoading } = useEventsPagination();
  const {
    events: searchEvents,
    isLoading: isSearchLoading,
    getEventsBySearchQuery,
    setEvents,
  } = useEventsResults();

  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const isLightMode = colorScheme !== "dark";
  const isLoading = isSearchLoading || isPaginationLoading;
  const isEmptyEventsList =
    (searchEvents && !searchEvents.length) || !events.length;

  const onActiveSearch = (active: boolean) => {
    Animated.timing(animatedOpacity, {
      useNativeDriver: true,
      toValue: active ? 1 : 0,
      duration: 140,
    }).start();
  };
  const onSubmitSearch = (val: string) => {
    onActiveSearch(false);
    getEventsBySearchQuery(val);
  };
  const onToggleSearchBar = (val: boolean) => {
    // user hides search bar, show the normal events list
    if (!val) setEvents(null);
  };

  /**
   * Old code for displaying horizontal lists (categories, organizers, etc.)
   */
  // const renderFeaturedLists = React.useCallback(() => {
  //   return browseFeatured.map((list, index) => (
  // <HorizontalCardsList navigateTo={navigateTo} key={index} list={list} />
  //   ));
  // }, [browseFeatured]);

  // const navigateTo = (params: BookingStackParamList["Available Dates"]) => {
  //   navigation.navigate("Available Dates", params);
  // };

  return (
    <SafeAreaView
      style={[isLightMode ? styles.safeArea_light : styles.safeaArea_dark]}>
      <View style={styles.topContainer}>
        <SearchBar
          onSubmitSearch={onSubmitSearch}
          onActiveSearch={onActiveSearch}
          onToggleSearchBar={onToggleSearchBar}
        />
      </View>
      <View style={styles.main}>
        {(events.length && !searchEvents) ||
        (searchEvents?.length && !isLoading) ? (
          <EventsList customEvents={searchEvents} />
        ) : !events.length && !searchEvents && isLoading ? (
          <ActivityIndicator
            animating={true}
            color={isLightMode ? Colors.primary.s800 : Colors.primary.neutral}
            size="large"
            style={{ paddingTop: Sizing.x35 }}
          />
        ) : (
          isEmptyEventsList && (
            <View style={styles.noEventsMessage}>
              <EmptyDocumentsIcon width="30%" height="30%" />
              <SubHeaderText
                colors={[Colors.primary.s800, Colors.primary.neutral]}>
                Nothing to show yet...
              </SubHeaderText>
            </View>
          )
        )}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.overlay,
            {
              opacity: animatedOpacity,
              zIndex: 20,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea_light: {
    flex: 1,
    backgroundColor: Colors.primary.neutral,
    alignItems: "center",
  },
  safeaArea_dark: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    width: "90%",
  },
  main: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: applyOpacity(Colors.neutral.s500, 0.5),
  },
  noEventsMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
