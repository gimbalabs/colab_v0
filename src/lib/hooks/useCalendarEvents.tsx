import { Events } from "Api/Events";
import { myCalendarContext } from "contexts/contextApi";
import * as React from "react";

export const useCalendarEvents = (id: string) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { events, setEvents } = myCalendarContext();

  React.useEffect(() => {
    async () => {
      try {
        setIsLoading(true);
        const res = await Events.getEventsByUserId();
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  return {
    isLoading,
    events,
  };
};
