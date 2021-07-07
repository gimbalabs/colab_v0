import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { appContext, bookingContext } from "contexts/contextApi";
import { EventConfirmationDetail } from "./EventConfirmationDetail";
import {
  AdaIcon,
  CalendarIcon,
  PresentationIcon,
  TimeIcon,
  UserIcon,
} from "assets/icons";
import { Colors, Sizing } from "styles/index";
import { months, weekDays } from "common/types/calendarTypes";
import { SectionDetail } from "common/interfaces/bookingInterface";
import {
  getDate,
  getDay,
  getDigitalLocaleTime,
  getMonth,
  getTimeSpanLength,
} from "lib/utils";

export const EventConfirmationDetails = ({ navigation }: any) => {
  const { colorScheme } = appContext();
  const {
    previewingOrganizer,
    duration,
    durationCost,
    pickedDate,
    eventTitle,
  } = bookingContext();

  const isLightMode = colorScheme === "light";

  const iconStyles = {
    stroke: isLightMode ? Colors.primary.s600 : Colors.primary.s200,
    strokeWidth: 1.8,
    width: 24,
    height: 24,
    marginRight: Sizing.x5,
  };

  const sectionsIcons = {
    presentation: <PresentationIcon {...iconStyles} />,
    user: <UserIcon {...iconStyles} />,
    calendar: <CalendarIcon {...iconStyles} />,
    time: <TimeIcon {...iconStyles} />,
    ada: <AdaIcon {...iconStyles} />,
  };

  const sections: SectionDetail[] = [
    eventTitle && {
      label: "Event",
      lineContent: {
        content: eventTitle,
        icon: sectionsIcons.presentation,
      },
    },
    previewingOrganizer.alias && {
      label: "Organizer",
      lineContent: {
        content: previewingOrganizer.alias,
        icon: sectionsIcons.user,
      },
    },
    pickedDate && {
      label: "Date & time",
      callbackFn: {
        label: "Edit",
        callbackFnScreen: "Available Dates",
      },
      lineContent: [
        {
          content: `${weekDays[getDay(pickedDate)]} - ${
            months[getMonth(pickedDate)]
          } ${getDate(pickedDate)}`,
          icon: sectionsIcons.calendar,
        },
        {
          content: `${getDigitalLocaleTime(
            pickedDate
          )} - ${getDigitalLocaleTime(pickedDate + duration)}`,
          icon: sectionsIcons.time,
        },
      ],
    },
    duration && {
      label: "Reservation time",
      callbackFn: {
        label: "Change",
        callbackFnScreen: "Available Times",
      },
      lineContent: {
        content: getTimeSpanLength(duration),
      },
    },
    durationCost && {
      label: "Total amount",
      lineContent: {
        content: `${durationCost} ADA`,
        icon: sectionsIcons.ada,
      },
    },
  ];

  const renderSections = ({
    item,
    index,
  }: {
    item: SectionDetail;
    index: number;
  }) => {
    return (
      <EventConfirmationDetail
        key={index}
        label={item.label}
        lineContent={item.lineContent}
        callbackFn={item.callbackFn}
        isLastItem={index === sections.length - 1}
      />
    );
  };

  const keyExtractor = (item: any, index: number) => `${item.label}_${index}`;

  return (
    <FlatList
      data={sections}
      renderItem={renderSections}
      keyExtractor={keyExtractor}
    />
  );
};
