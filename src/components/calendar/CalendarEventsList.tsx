import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";

import { Sizing, Colors, Outlines } from "styles";
import { myCalendarContext } from "contexts/contextApi";
import { CalendarEventsDetail } from ".";
import { getDigitalTime, getDay, month } from "utils";
import { getYear } from "lib/utils";
import { ScheduledEvent } from "common/interfaces/myCalendarInterface";

export const CalendarEventsList = () => {
  const {
    previewingDayEvents,
    scheduledEvents,
    calendarHeader,
  } = myCalendarContext();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = React.useState<number>(
    new Date().getTime()
  );

  const renderItem = ({ item }: any) => {
    const { title, description, fromTime, toTime, participants } = item;

    return (
      <CalendarEventsDetail
        title={title}
        description={description}
        fromTime={fromTime}
        toTime={toTime}
        participants={participants}
      />
    );
  };

  const keyExtractor = (item: any) => `${item.fromTime}_${item.toTime}`;

  const wait = (ms: number): Promise<void> => {
    return new Promise((res) => setTimeout(res, ms));
  };

  // fetch new events, update calendar state
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await wait(2500);
    setRefreshing(false);
    setLastUpdated(new Date().getTime());
  }, [refreshing]);

  // @TODO: Store lastUpdated value inside context store for future reference
  const lastUpdatedDay =
    getDay(lastUpdated) - getDay() === -1
      ? `Yestarday ${getDigitalTime(lastUpdated)}`
      : getDay(lastUpdated) - getDay() < -1
      ? `${getDay(lastUpdated)}/${month(lastUpdated)}`
      : `Today ${getDigitalTime(lastUpdated)}`;

  const title = `Last updated: ${lastUpdatedDay}`;

  const data = React.useMemo(() => {
    if (previewingDayEvents) return previewingDayEvents;
    var monthlyEvents: ScheduledEvent[] = [];

    for (let scheduledYear of scheduledEvents) {
      if (scheduledYear.year === getYear()) {
        if (scheduledYear.months) {
          var monthObj = scheduledYear.months.find(
            (obj) => obj.month === calendarHeader.month
          );

          if (monthObj != null) {
            monthObj.days.forEach((day) =>
              day.scheduledEvents.forEach((evt) => monthlyEvents.push(evt))
            );
          }
        }
      }
    }
    return monthlyEvents;
  }, [
    calendarHeader.month,
    calendarHeader.year,
    scheduledEvents,
    previewingDayEvents,
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.eventsHolder}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            scrollEventThrottle={500}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={10}
            progressViewOffset={15}
            refreshControl={
              <RefreshControl
                size={1}
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
