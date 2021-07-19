import * as React from "react";
import {
  View,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  SectionList,
  Text,
  Pressable,
} from "react-native";
import { CalendarEventsDetail } from "./CalendarEventsDetail";

import { appContext, myCalendarContext } from "contexts/contextApi";
import { getDate, getYear } from "lib/utils";
import { Sizing, Colors, Outlines, Typography, Buttons } from "styles/index";
import { ScheduledEvent } from "common/interfaces/myCalendarInterface";
import { CalendarEventsListHeader } from "./CalendarEventsListHeader";
import { CalendarEventsListEmpty } from "./CalendarEventsListEmpty";
import { months } from "common/types/calendarTypes";
import { PlusIcon } from "assets/icons";
import { applyOpacity } from "../../styles/colors";

export interface CalendarEventsListProps {
  isHomeScreen?: boolean;
  isBookingCalendar?: boolean;
}

export const CalendarEventsList = ({
  isHomeScreen,
  isBookingCalendar,
}: CalendarEventsListProps) => {
  const { scheduledEvents, calendarHeader } = myCalendarContext();
  const { colorScheme, accountType } = appContext();
  const [dimensions, setDimensions] = React.useState<LayoutRectangle | null>(
    null
  );
  const [highlightedDay, setHighlightedDay] = React.useState<any>({
    listSection: "",
    index: null,
  });
  const isLightMode = colorScheme === "light";

  const renderItem = ({ item, index, section }: any) => {
    const {
      title,
      description,
      fromTime,
      toTime,
      participants,
      organizer,
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
    var monthlyEvents: ScheduledEvent[] = [];
    var dayEvents: ScheduledEvent[] = [];

    for (let scheduledYear of scheduledEvents) {
      if (scheduledYear.year === getYear()) {
        if (scheduledYear.months) {
          var monthObj = scheduledYear.months.find((obj) => {
            if (isHomeScreen && accountType === "attendee") {
              return obj.month === months[new Date().getMonth()];
            }
            return obj.month === calendarHeader.month;
          });

          if (monthObj != null) {
            monthObj.days.forEach((day) =>
              day.scheduledEvents.forEach((evt) => {
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
  }, [calendarHeader.month]);

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
  const onAddEventPress = () => {};

  return (
    <View style={styles.eventsHolder} onLayout={onLayout}>
      <CalendarEventsListHeader numOfEvents={numOfEvents} />
      {(isBookingCalendar || isHomeScreen) && (
        <>
          {data().length > 0 ? (
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
          ) : accountType === "organizer" ? (
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={onAddEventPress}
                style={Buttons.applyOpacity(
                  Object.assign(
                    {},
                    styles.addEventButton,
                    isLightMode
                      ? { backgroundColor: Colors.primary.s800 }
                      : { backgroundColor: Colors.primary.neutral }
                  )
                )}>
                <Text
                  style={[
                    styles.addEventButtonText,
                    isLightMode
                      ? { color: Colors.primary.neutral }
                      : { color: Colors.primary.s800 },
                  ]}>
                  Add Event
                </Text>
                <PlusIcon
                  color={
                    isLightMode ? Colors.primary.neutral : Colors.primary.s800
                  }
                  width={Sizing.x14}
                  height={Sizing.x14}
                  strokeWidth={3.4}
                />
              </Pressable>
            </View>
          ) : null}
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
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventButton: {
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x10,
    ...Outlines.shadow.base,
  },
  addEventButtonText: {
    ...Typography.header.x20,
    marginRight: Sizing.x5,
  },
});
