import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";

import { Sizing, Colors, Outlines } from "styles";
import { MyCalendarContext } from "contexts/myCalendarContext";
import { CalendarEventsDetail } from ".";
import { CalendarEvent } from "interfaces/myCalendarInterface";
import { getDigitalTime } from "lib/utils";

// last updated: date -> scrollToRefresh

export const CalendarEventsList = () => {
  const { state } = React.useContext(MyCalendarContext);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = React.useState<number>(
    new Date().getTime()
  );

  const renderItem = ({ item }: any): JSX.Element => {
    const { title, fromDate, toDate, participants } = item;

    return (
      <CalendarEventsDetail
        title={title}
        fromDate={fromDate}
        toDate={toDate}
        participants={participants}
      />
    );
  };

  const keyExtractor = (item: any) => `${item.fromDate}_${item.toDate}`;

  function wait(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  // fetch new events, update calendar state
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await wait(2500);
    console.log("refreshed");
    setRefreshing(false);
    setLastUpdated(new Date().getTime());
  }, [refreshing]);

  const title = `Last updated ${getDigitalTime(lastUpdated)}`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.eventsHolder}>
          <FlatList
            data={state.scheduledEvents}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            scrollEventThrottle={500}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={10}
            progressViewOffset={15}
            refreshControl={
              <RefreshControl
                title={title}
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary.s200}
              />
            }
            removeClippedSubviews
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "column",
    margin: Sizing.x20,
  },
  eventsHolder: {
    alignItems: "center",
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: Outlines.borderRadius.small,
    borderWidth: Outlines.borderWidth.base,
    borderColor: Colors.neutral.s400,
  },
});
