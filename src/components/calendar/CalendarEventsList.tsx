import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Text,
  Pressable,
} from "react-native";
import { CalendarEventsDetail } from "./CalendarEventsDetail";

import { myCalendarContext } from "contexts/contextApi";
import { getDigitalTime, getDay, getYear, month } from "utils";
import { Buttons, Sizing, Colors, Outlines, Typography } from "styles";
import { ScheduledEvent } from "common/interfaces/myCalendarInterface";
import { RemoveIcon } from "assets/icons";

export const CalendarEventsList = () => {
  const {
    previewingDayEvents,
    clearPreviewDayEvents,
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
        key={`${item.fromTime}_${item.toTime}`}
        title={title}
        description={description}
        fromTime={fromTime}
        toTime={toTime}
        participants={participants}
      />
    );
  };

  const keyExtractor = (item: any, index: number) =>
    `${index}_${item.fromTime}_${item.toTime}`;

  // fetch new events, update calendar state
  const onRefresh = React.useCallback(async () => {
    const wait = (ms: number): Promise<void> => {
      return new Promise((res) => setTimeout(res, ms));
    };

    setRefreshing(true);
    await wait(2500);
    setRefreshing(false);
    setLastUpdated(new Date().getTime());
  }, [refreshing]);

  const onClosePress = () => {
    clearPreviewDayEvents();
  };

  // @TODO: Store lastUpdated value inside context store for future reference
  const lastUpdatedDay =
    getDay(lastUpdated) - getDay() === -1
      ? `Yestarday ${getDigitalTime(lastUpdated)}`
      : getDay(lastUpdated) - getDay() < -1
      ? `${getDay(lastUpdated)}/${month(lastUpdated)}`
      : `Today ${getDigitalTime(lastUpdated)}`;

  const title = `Last updated: ${lastUpdatedDay}`;

  const data = React.useMemo(() => {
    // When user clicks on a day to preview the events on a specific day
    // just return those events.
    if (previewingDayEvents != undefined) return previewingDayEvents.events;

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
  }, [previewingDayEvents, calendarHeader.month, scheduledEvents]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.eventsHolder}>
          {previewingDayEvents && (
            <View style={styles.dayPreviewBar}>
              <Text style={styles.dayPreviewBarText}>
                Upcoming events on:{" "}
                <Text style={{ fontWeight: "600" }}>
                  {previewingDayEvents.month} {previewingDayEvents.day}
                </Text>
              </Text>
              <Pressable
                onPress={onClosePress}
                style={Buttons.applyOpacity(styles.dayPreviewBarButton)}>
                <RemoveIcon height={18} width={18} stroke="#000" />
              </Pressable>
            </View>
          )}
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
  dayPreviewBar: {
    width: "95%",
    marginTop: "2%",
    padding: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.neutral.s100,
  },
  dayPreviewBarText: {
    ...Typography.body.x10,
  },
  dayPreviewBarButton: {},
});
