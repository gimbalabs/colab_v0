import * as React from "react";
import {
  View,
  FlatList,
  RefreshControl,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CalendarEventsDetail } from "./CalendarEventsDetail";

import { myCalendarContext } from "contexts/contextApi";
import { getDigitalTime, getDay, getYear, getMonth } from "lib/utils";
import { Sizing, Colors, Outlines } from "styles/index";
import { ScheduledEvent } from "common/interfaces/myCalendarInterface";
import { CalendarEventsListHeader } from "./CalendarEventsListHeader";
import { CalendarEventsListEmpty } from "./CalendarEventsListEmpty";

export const CalendarEventsList = () => {
  const {
    previewingDayEvents,
    clearPreviewDayEvents,
    scheduledEvents,
    calendarHeader,
  } = myCalendarContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
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

  const onClosePress = () => {
    clearPreviewDayEvents();
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
  };

  const data = React.useMemo(() => {
    // When user clicks on a day to preview the events
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
    <View style={styles.eventsHolder} onLayout={onLayout}>
      <ScrollView style={styles.scrollableView}>
        {previewingDayEvents && (
          <CalendarEventsListHeader onClosePress={onClosePress} />
        )}
        {data ? (
          <FlatList
            data={data}
            style={[
              styles.flatList,
              { width: dimensions ? dimensions.width : "100%" },
            ]}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            scrollEventThrottle={500}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={10}
            progressViewOffset={15}
            removeClippedSubviews
          />
        ) : (
          <CalendarEventsListEmpty />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  eventsHolder: {
    flex: 1,
    width: "95%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Outlines.borderRadius.small,
  },
  scrollableView: {
    flex: 1,
  },
  flatList: {
    maxWidth: "95%",
    marginTop: "2%",
  },
});
