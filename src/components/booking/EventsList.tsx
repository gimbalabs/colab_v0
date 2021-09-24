import * as React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  VirtualizedList,
} from "react-native";

import { EventsListCard } from "./EventsListCard";
import { getRandomKey } from "lib/utils";
import { useEventsPagination } from "lib/hooks/useEventsPagination";
import { SubHeaderText } from "components/rnWrappers/subHeaderText";
import { Colors, Sizing } from "styles/index";
import { appContext } from "contexts/contextApi";

export interface EventsListProps {}

export const EventsList = ({}: EventsListProps) => {
  const { events, isLoading, getEventsPaginated, eventsPage } =
    useEventsPagination();
  const { colorScheme } = appContext();
  const isLightMode = colorScheme !== "dark";

  const renderEventCard = React.useCallback(
    ({ item }: any) => {
      const { title, description, selectedDays, imageURI, eventCardColor } =
        item;
      const selectedDaysArr: number[] = Object.values(selectedDays ?? {});
      const fromDate = Math.min(...selectedDaysArr);
      const toDate = Math.max(...selectedDaysArr);

      return (
        <EventsListCard
          title={title}
          description={description}
          fromDate={fromDate}
          toDate={toDate}
          image={imageURI}
          color={eventCardColor}
          isTransparent={eventCardColor === "transparent"}
        />
      );
    },
    [events]
  );

  const keyExtractor = (item: any, index: number) => getRandomKey(index);
  const getItem = (data: any, index: number) => data[index];
  const getItemCount = (data: any) => data.length;
  const loadEvents = async (page: number, isRefreshing: boolean) => {
    await getEventsPaginated(page, isRefreshing);
  };

  const _ActivityIndicator = () => (
    <ActivityIndicator
      animating={true}
      color={isLightMode ? Colors.primary.s800 : Colors.primary.neutral}
      size="large"
      style={{ paddingTop: Sizing.x35 }}
    />
  );

  return (
    <>
      {!!events.length && !isLoading ? (
        <VirtualizedList
          style={{ flex: 1 }}
          data={events}
          getItem={getItem}
          refreshing={isLoading}
          initialNumToRender={4}
          onEndReachedThreshold={0.5}
          onEndReached={() => loadEvents(eventsPage + 1, false)}
          getItemCount={getItemCount}
          renderItem={renderEventCard}
          keyExtractor={keyExtractor}
          onRefresh={() => loadEvents(1, true)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={_ActivityIndicator}
          removeClippedSubviews
        />
      ) : !events.length && isLoading ? (
        <_ActivityIndicator />
      ) : (
        <View style={styles.noEventsMessage}>
          <SubHeaderText colors={[Colors.primary.s800, Colors.primary.neutral]}>
            Nothing yet to show...
          </SubHeaderText>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  noEventsMessage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
