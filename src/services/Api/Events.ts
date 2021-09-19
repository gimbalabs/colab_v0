import { CreateEventDto } from "common/types/dto/create-event.dto";
import { EventBookingDto } from "common/types/dto/event-booking.dto";
import axios from "./base";

export class Events {
  public static async createEvent(event: CreateEventDto): Promise<any> {
    try {
      const res = await axios.post("/events", event);
      if (res.data) return res.data;
    } catch (e) {
      if (e.response) throw new Error(e.response.data.message);
    }
  }

  public static async bookEvent(event: EventBookingDto): Promise<any> {
    try {
      const { eventId } = event;
      const res = await axios.post(`events/booking/${eventId}`, event);

      if (res.data) return res.data;
    } catch (e) {
      if (e.response) throw new Error(e.response.data);
    }
  }

  public static async getEvents(): Promise<any> {
    try {
      const res = await axios.get("events");

      if (res) return res.data;
    } catch (e) {
      if (e.response) console.error(e.response.data);
    }
  }
}
