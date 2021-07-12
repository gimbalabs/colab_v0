import * as React from "react";

import { CalendarEventsDetail } from "./CalendarEventsDetail";

export const CalendarEventsDetails = ({ item }: any) => {
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
