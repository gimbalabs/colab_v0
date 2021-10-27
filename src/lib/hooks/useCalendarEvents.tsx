import { Users } from "Api/Users";
import { myCalendarContext } from "contexts/contextApi";
import { convertToCalendarEvents } from "lib/utils";
import * as React from "react";

export const useCalendarEvents = (id: string) => {
  const { setEvents } = myCalendarContext();

  const getEvents = async (currCalendarDate?: Date) => {
    setEvents(null);

    try {
      let res = await Users.getUserCalendarEvents(id, currCalendarDate);

      if (res) {
        res = convertToCalendarEvents(res);

        if (res && res.length) setEvents(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    // if (!events) {
    // setIsLoading(true);
    // }
  }, []);

  return {
    getEvents,
  };
};
