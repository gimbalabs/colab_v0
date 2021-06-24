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
import { getDate, getDay, getMonth, getYear } from "lib/utils";
import { Sizing, Colors, Outlines, Typography } from "styles/index";
import { ScheduledEvent } from "common/interfaces/myCalendarInterface";
import { CalendarEventsListHeader } from "./CalendarEventsListHeader";
import { CalendarEventsListEmpty } from "./CalendarEventsListEmpty";
import { months } from "common/types/calendarTypes";

export interface CalendarEventsListProps {
  isHomeScreen?: boolean;
}

export const CalendarEventsList = ({
  isHomeScreen,
}: CalendarEventsListProps) => {
  const {
    previewingDayEvents,
    scheduledEvents,
    calendarHeader,
  } = myCalendarContext();
  const { colorScheme } = appContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  const [highlightedDay, setHighlightedDay] = React.useState<any>(null);
  const [monthEventsLenght, setMonthEventsLength] = React.useState<number>(0);
  const [dayEventsLenght, setDayEventsLength] = React.useState<number>(0);

  const renderItem = ({ item, section }: any) => {
    const {
      title,
      description,
      fromTime,
      toTime,
      participants,
      organizer,
      index,
    } = item;

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

  const data = React.useMemo((): { title: string; data: any }[] => {
    var monthlyEvents: ScheduledEvent[] = [];
    var dayEvents: ScheduledEvent[] = [];

    for (let scheduledYear of scheduledEvents) {
      if (scheduledYear.year === getYear()) {
        if (scheduledYear.months) {
          var monthObj = scheduledYear.months.find((obj) => {
            //@TODO Change this return value to current month events in prod.
            if (isHomeScreen) {
              return obj.month === "May";
            }
            return obj.month === calendarHeader.month;
          });

          if (monthObj != null) {
            monthObj.days.forEach((day) =>
              day.scheduledEvents.forEach((evt) => {
                //@TODO Change this return value to current month events in prod.
                if (isHomeScreen && day.day === 13) {
                  dayEvents.push(evt);
                }

                if (day.day === getDate()) {
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
    var sections;

    if (!!dayEvents.length) {
      sections = [
        { title: "Today", data: [...dayEvents] },
        { title: "This month", data: [...monthlyEvents] },
      ];
    } else {
      sections = [{ title: "This month", data: [...monthlyEvents] }];
    }

    setMonthEventsLength(monthlyEvents.length);
    setDayEventsLength(dayEvents.length);

    return sections;
  }, [previewingDayEvents, calendarHeader.month, scheduledEvents]);

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

  return (
    <View style={styles.eventsHolder} onLayout={onLayout}>
      {isHomeScreen || calendarHeader.numOfEvents ? (
        <>
          <CalendarEventsListHeader isHomeScreen />
          {data ? (
            <SectionList
              style={[
                {
                  width: dimensions ? dimensions.width : "100%",
                },
              ]}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              scrollEventThrottle={500}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={5}
              progressViewOffset={15}
              sections={data}
              renderSectionHeader={sectionHeader}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <CalendarEventsListEmpty />
          )}
        </>
      ) : null}
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
    ...Typography.header.x35,
    fontSize: 17,
    color: Colors.primary.s600,
  },
  sectionHeader_dark: {
    width: "50%",
    marginLeft: Sizing.x20,
    ...Typography.header.x35,
    fontSize: 17,
    color: Colors.primary.neutral,
  },
});
