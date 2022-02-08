import * as React from "react";
import {
  View,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  SectionList,
  Text,
} from "react-native";
import { CalendarEventsDetail } from "./CalendarEventsDetail";

import { appContext, myCalendarContext } from "contexts/contextApi";
import { getDate, getYear } from "lib/utils";
import { Sizing, Colors, Outlines, Typography } from "styles/index";
import { Event } from "common/interfaces/myCalendarInterface";
import { CalendarEventsListHeader } from "./CalendarEventsListHeader";
import { months } from "common/types/calendarTypes";

export interface CalendarEventsListProps {
  isHomeScreen?: boolean;
  isBookingCalendar?: boolean;
}

export const CalendarEventsList = ({
  isHomeScreen,
  isBookingCalendar,
}: CalendarEventsListProps) => {
  const { events, calendarHeader } = myCalendarContext();
  const { colorScheme, accountType } = appContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  const [highlightedDay, setHighlightedDay] = React.useState<any>({
    listSection: "",
    index: null,
  });

  const renderItem = ({ item, index, section }: any) => {
    const { title, description, fromTime, toTime, participants, organizer } =
      item;

    return (
      <CalendarEventsDetail
        key={`${item.fromTime}_${item.toTime}`}
        index={index}
        title={title}
        description={description}
        fromTime={fromTime}
        toTime={toTime}
        participants={participants}
        organizer={organizer}
        listLength={section.data.length}
        listSection={section.title}
        highlightedDay={highlightedDay}
        setHighlightedDay={setHighlightedDay}
      />
    );
  };

  const keyExtractor = (item: any, index: number) =>
    `${index}_${item.fromTime}_${item.toTime}`;

  const onLayout = (event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
  };

  const data = React.useCallback((): { title: string; data: any }[] => {
    var monthlyEvents: Event[] = [];
    var dayEvents: Event[] = [];

    // merge two arrays,
    // based on the event type ('booked event' or 'scheduled event') display the right color/info,

    if (events) {
      for (let scheduledYear of events) {
        if (scheduledYear.year === getYear()) {
          if (scheduledYear.months) {
            var monthObj = scheduledYear.months.find((obj) => {
              if (isHomeScreen && accountType === "attendee") {
                return obj.month === months[new Date().getMonth()];
              }
              return obj.month === calendarHeader.month;
            });

            if (monthObj != null) {
              monthObj.days.forEach((day: any) =>
                day.events.forEach((evt: Event) => {
                  if (isHomeScreen && day.day === new Date().getDate()) {
                    dayEvents.push(evt);
                  } else if (day.day === getDate()) {
                    dayEvents.push(evt);
                  } else {
                    monthlyEvents.push(evt);
                  }
                })
              );
            }
          }
        }
      }
    }
    const sections: any[] = [];

    if (dayEvents.length) {
      sections.push({ title: "Today", data: [...dayEvents] });
    }
    if (monthlyEvents.length) {
      sections.push({
        title: "This month",
        data: [...monthlyEvents],
      });
    }

    return sections;
  }, [calendarHeader.month, events]);

  const sectionHeader = ({ section }: any) => {
    const { title } = section;

    return (
      <View style={styles.sectionHeaderWrapper}>
        <Text
          style={
            colorScheme === "light"
              ? styles.sectionHeader_light
              : styles.sectionHeader_dark
          }>
          {title}
        </Text>
      </View>
    );
  };
  const numOfEvents = data().reduce((acc, curr) => acc + curr.data.length, 0);

  return (
    <View style={styles.eventsHolder} onLayout={onLayout}>
      <CalendarEventsListHeader numOfEvents={numOfEvents} />
      {(isBookingCalendar || isHomeScreen) && (
        <>
          {data().length > 0 && (
            <SectionList
              contentContainerStyle={[
                {
                  width: dimensions ? dimensions.width : "100%",
                  paddingBottom: Sizing.x5,
                },
              ]}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              scrollEventThrottle={500}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={5}
              progressViewOffset={15}
              sections={data()}
              renderSectionHeader={sectionHeader}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eventsHolder: {
    flex: 1,
    width: "95%",
    alignItems: "center",
    borderRadius: Outlines.borderRadius.small,
  },
  sectionHeaderWrapper: {
    marginVertical: Sizing.x7,
  },
  sectionHeader_light: {
    width: "50%",
    alignSelf: "baseline",
    marginLeft: Sizing.x20,
    ...Typography.subHeader.x30,
    color: Colors.primary.s600,
  },
  sectionHeader_dark: {
    width: "50%",
    marginLeft: Sizing.x20,
    ...Typography.header.x30,
    color: Colors.primary.neutral,
  },
});
